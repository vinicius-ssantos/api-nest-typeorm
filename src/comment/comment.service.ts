import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindAllParameters, CommentDto } from "../comment/comment.dto";
import { v4 as uuid } from "uuid";
import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";

@Injectable()
export class CommentService {
  constructor(private readonly postService: PostService,
              private readonly userService: UserService) {}


  private comments: CommentDto[] = [];

  create(comment) {
    this.postService.findById(comment.postId);
    this.userService.findById(comment.userId);
    comment.id = uuid()
    this.comments.push(comment);
    console.log(comment);
  }

  findById(id: string): CommentDto {
    const foundComment = this.comments.filter((comment) => comment.id === id);
    if (foundComment.length) {
      return foundComment[0];
    }
    throw new HttpException(
      `Comment with ID ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): CommentDto[] {
    return this.comments.filter((comment) => {
      let match = true;
      if (params.text != undefined && comment.text !== params.text) {
        match = false;
      }

      return match;
    });
  }

  update(comment: CommentDto) {
    let commentIndex = this.comments.findIndex((c) => c.id === comment.id);
    if (commentIndex >= 0) {
      this.comments[commentIndex] = comment;
      return;
    }
    throw new HttpException(
      `Comment with ID ${comment.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    let commentIndex = this.comments.findIndex((u) => u.id === id);
    if (commentIndex >= 0) {
      this.comments.splice(commentIndex, 1);
      return;
    }
    throw new HttpException(
      `Comment with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
