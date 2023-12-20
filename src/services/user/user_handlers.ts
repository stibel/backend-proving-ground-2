import { Repository } from "typeorm";
import { User } from "../../db/entities/User";
import { UserDto } from "../../db/dto/user_dto";

export const save = async (repository: Repository<User>, dto: UserDto) => {
  return repository.save(dto);
};
