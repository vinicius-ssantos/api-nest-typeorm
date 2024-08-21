import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { v4 as uuid } from "uuid";
import { FindAllParameters, PostDto } from "./post.dto";
import { AuthorService } from "../author/author.service";


@Injectable()
export class PostService {
  private posts: PostDto[] = [];

  constructor(private readonly authorService: AuthorService) {}

  create(post: PostDto) {
    this.authorService.findById(post.authorId);
    post.id = uuid();
    this.posts.push(post);
    console.log(post);
  }

  findById(id: string): PostDto {
    const foundPost = this.posts.filter((post) => post.id === id);
    if (foundPost.length) {
      return foundPost[0];
    }
    throw new HttpException(`Post with ID ${id} not found`, HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): PostDto[] {
    return this.posts.filter((post) => {
      let match = true;
      if (params.title != undefined && post.title !== params.title) {
        match = false;
      }
      if (params.text != undefined && post.text !== params.text) {
        match = false;
      }
      return match;
    });
  }

  update(post: PostDto) {
    let postIndex = this.posts.findIndex((a) => a.id === post.id);
    if (postIndex >= 0) {
      this.posts[postIndex] = post;
      return;
    }
    throw new HttpException(`Post with ID ${post.id} not found`, HttpStatus.BAD_REQUEST,);
  }

  remove(id: string) {
    let postIndex = this.posts.findIndex((a) => a.id === id);
    if (postIndex >= 0) {
      this.posts.splice(postIndex, 1);
      return;
    }
    throw new HttpException(`Post with ID ${id} not found`, HttpStatus.BAD_REQUEST);
  }
}
