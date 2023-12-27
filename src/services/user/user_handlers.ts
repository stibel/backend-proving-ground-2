import { Repository } from "typeorm";
import { User } from "../../db/entities/User";
import { UserDto } from "../../db/dto/user_dto";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export const save = async (
  repository: Repository<User>,
  dto: UserDto,
): Promise<User> => {
  if (!dto) {
    throw new Error("Invalid content");
  }

  return repository.save(dto);
};

export const login = async (repository: Repository<User>, dto: UserDto) => {
  if (!dto) {
    throw new Error("No username and password!");
  }

  const { username, password } = dto;

  const user = await repository.findOne({
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
  );

  return { accessToken };
};
