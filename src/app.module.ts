import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UserModule, AuthorModule, PostModule, CommentModule,
    ConfigModule.forRoot({ isGlobal: true }),DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
