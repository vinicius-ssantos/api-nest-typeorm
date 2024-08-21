import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { CommentService } from "./comment.service";
import { CommentDto, FindAllParameters } from "./comment.dto";


@Controller('comment')
export class CommentController {
  constructor(private readonly commentService:CommentService ) {}

  @Post()
  create(@Body() comment: CommentDto) {
    this.commentService.create(comment);
  }

  @Get('/:id')
  findById(@Param('id') id: string): CommentDto {
    return this.commentService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): CommentDto[] {
    return this.commentService.findAll(params);
  }

  @Put()
  update(@Body() comment: CommentDto) {
    this.commentService.update(comment);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
  
}
