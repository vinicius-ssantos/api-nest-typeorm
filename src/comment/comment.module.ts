import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/entities/user.entity";
import { CommentEntity } from "../db/entities/comment.entity";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [PostModule,UserModule,TypeOrmModule.forFeature([CommentEntity])],
})
export class CommentModule {}
