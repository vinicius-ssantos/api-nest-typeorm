import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";


import { PostService } from "./post.service";
import { FindAllParameters, PostDto } from "./post.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService:PostService ) {}

  @Post()
  create(@Body() post: PostDto) {
    this.postService.create(post);
  }

  @Get('/:id')
  findById(@Param('id') id: string): PostDto {
    return this.postService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): PostDto[] {
    return this.postService.findAll(params);
  }

  @Put()
  update(@Body() post: PostDto) {
    this.postService.update(post);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

}
