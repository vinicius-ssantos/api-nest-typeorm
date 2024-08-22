import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PostService } from './post.service';
import { FindAllParameters, PostDto } from './post.dto';
import { TaskRouteParameters } from '../user/user.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() post: PostDto): Promise<PostDto> {
    return await this.postService.create(post);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<PostDto> {
    return await this.postService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<PostDto[]> {
    return await this.postService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() post: PostDto) {
    await this.postService.update(params.id, post);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }
}
