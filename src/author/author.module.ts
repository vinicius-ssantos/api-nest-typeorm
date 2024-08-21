import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService]
})
export class AuthorModule {}
