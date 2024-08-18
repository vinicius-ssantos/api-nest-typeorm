import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindAllParameters, UserDto } from "./user.dto";

@Injectable()
export class UserService {
  private users :UserDto[] = [];
  create(user){
    this.users.push(user);
    console.log(this.users);
  }

  findById(id: string): UserDto {
    const foundUser = this.users.filter((user) => user.id === id);
    if (foundUser.length) {
      return foundUser[0];
    }
    throw new HttpException(
      `User with ID ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): UserDto[] {
    return this.users.filter((user) => {
      let match = true;
      if (params.name != undefined && user.name !== params.name) {
        match = false;
      }
      if (params.email != undefined && user.email !== params.email) {
        match = false;
      }
      return match;
    });
  }

  update(user: UserDto) {
    let userIndex = this.users.findIndex((u) => u.id === user.id);
    if (userIndex >= 0) {
      this.users[userIndex] = user;
      return;
    }
    throw new HttpException(
      `User with ID ${user.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    let userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
      return;
    }
    throw new HttpException(
      `User with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }



}
