import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];
  create(user){
    this.users.push(user);
    console.log(this.users);
  }
}
