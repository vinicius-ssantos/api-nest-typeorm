import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthorModule } from "../author/author.module";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [AuthorModule],
  exports: [PostService]
})
export class PostModule {}
