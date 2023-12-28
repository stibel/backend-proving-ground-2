import { Repository } from "typeorm";
import { User } from "../../db/entities/User";
import { UserDto } from "../../db/dto/user_dto";
import { compareSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { RefreshToken } from "../../db/entities/RefreshToken";
import { TokenDto } from "../../db/dto/token_dto";

export const save = async (
  repository: Repository<User>,
  dto: UserDto,
): Promise<User> => {
  if (!dto) {
    throw new Error("Invalid content");
  }

  return repository.save(dto);
};

export const login = async (
  userRepository: Repository<User>,
  tokenRepository: Repository<RefreshToken>,
  dto: UserDto,
) => {
  if (!dto) {
    throw new Error("No username and password!");
  }

  const { username, password } = dto;

  const user = await userRepository.findOne({
    where: [{ username: username }],
  });

  if (!user) {
    throw new Error("No user with this username!");
  }

  if (!compareSync(password, user?.password))
    throw new Error("Incorrect password!");

  const accessToken = sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "5s" },
  );

  const refreshToken = sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET as string,
  );

  const refresh = await tokenRepository.save({ token: refreshToken });

  return { accessToken, refreshToken: refresh };
};

export const refresh = async (
  tokenRepository: Repository<RefreshToken>,
  dto: TokenDto,
) => {
  console.log("REFRESH");
  const { token } = dto;
  if (!token) {
    throw new Error("No refresh token provided!");
  }

  // @ts-ignore
  const { token: savedToken } = await tokenRepository.findOne({ token: token });

  if (!savedToken) {
    throw new Error("No such refresh token stored!");
  }

  let newAccessToken;

  verify(
    savedToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    //@ts-ignore
    (err: unknown, user) => {
      if (err) {
        throw new Error(err as string);
      }

      newAccessToken = sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "5s" },
      );
    },
  );

  return { accessToken: newAccessToken };
};

export const logout = async (
  tokenRepository: Repository<RefreshToken>,
  dto: TokenDto,
) => {
  const { token } = dto;

  return tokenRepository.delete({ token: token });
};
