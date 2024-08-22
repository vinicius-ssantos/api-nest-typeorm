import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthorModule } from "../author/author.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "../db/entities/post.entity";

@Module({
  controllers: [PostController,],
  providers: [PostService],
  imports: [AuthorModule,TypeOrmModule.forFeature([PostEntity])],
  exports: [PostService]
})
export class PostModule {}
