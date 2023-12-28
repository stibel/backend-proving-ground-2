import { Repository } from "typeorm";
import { User } from "../../db/entities/User";
import { UserDto } from "../../db/dto/user_dto";
import { RefreshToken } from "../../db/entities/RefreshToken";
import { TokenDto } from "../../db/dto/token_dto";
export declare const save: (repository: Repository<User>, dto: UserDto) => Promise<User>;
export declare const login: (userRepository: Repository<User>, tokenRepository: Repository<RefreshToken>, dto: UserDto) => Promise<{
    accessToken: string;
    refreshToken: {
        token: string;
    } & RefreshToken;
}>;
export declare const refresh: (tokenRepository: Repository<RefreshToken>, dto: TokenDto) => Promise<{
    accessToken: undefined;
}>;
export declare const logout: (tokenRepository: Repository<RefreshToken>, dto: TokenDto) => Promise<import("typeorm").DeleteResult>;
