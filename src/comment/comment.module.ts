import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostModule } from "../post/post.module";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [PostModule,UserModule],
})
export class CommentModule {}
