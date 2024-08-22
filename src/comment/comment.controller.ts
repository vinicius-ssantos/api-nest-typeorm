import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { CommentService } from "./comment.service";
import { CommentDto, FindAllParameters, TaskRouteParameters } from "./comment.dto";
import { CommentEntity } from "../db/entities/comment.entity";



@Controller('comment')
export class CommentController {
  constructor(private readonly commentService:CommentService ) {}

  @Post()
  async  create(@Body() comment: CommentDto):Promise<CommentEntity> {
  return await  this.commentService.create(comment);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<CommentDto> {
    return await this.commentService.findById(id);
  }

  @Get()
  async  findAll(@Query() params: FindAllParameters): Promise<CommentDto[]> {
    return await this.commentService.findAll(params);
  }

  @Put('/:id')
  async  update(@Param() params: TaskRouteParameters,@Body() comment: CommentDto) {
    await   this.commentService.update(params.id,comment);
  }

  @Delete('/:id')
  async  remove(@Param('id') id: string) {
    return await this.commentService.remove(id);
  }
  
}
