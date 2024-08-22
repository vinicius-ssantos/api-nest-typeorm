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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Cria um novo post', description: 'Esse endpoint cria um novo post no sistema' })
  @ApiBody({
    description: 'Dados do post',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          authorId:'9b01f820-6c17-4a0d-bd09-b213ac93f421',
          title: 'Novo Post',
          text: 'Conteúdo do post'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Post criado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        authorId:'9b01f820-6c17-4a0d-bd09-b213ac93f421',
        title: 'Novo Post',
        text: 'Conteúdo do post'
      }
    } })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async create(@Body() post: PostDto): Promise<PostDto> {
    return await this.postService.create(post);
  }

  @ApiOperation({ summary: 'Retorna um post pelo ID', description: 'Esse endpoint retorna os detalhes de um post específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Post retornado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        title: 'Novo Post',
        text: 'Conteúdo do post'
      }
    } })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<PostDto> {
    return await this.postService.findById(id);
  }


  @ApiOperation({ summary: 'Retorna todos os posts', description: 'Esse endpoint retorna uma lista de todos os posts no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de posts retornada com sucesso',
    schema: {
      example: [
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
          title: 'Post 1',
          text: 'Conteúdo do post 1'
        },
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f422",
          title: 'Post 2',
          text: 'Conteúdo do post 2'
        }
      ]
    } })
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<PostDto[]> {
    return await this.postService.findAll(params);
  }

  @ApiOperation({ summary: 'Atualiza um post pelo ID', description: 'Esse endpoint atualiza os detalhes de um post específico pelo ID' })
  @ApiBody({
    description: 'Dados do post',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          title: 'Post Atualizado',
          text: 'Conteúdo atualizado do post'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Post atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() post: PostDto) {
    await this.postService.update(params.id, post);
  }

  @ApiOperation({ summary: 'Remove um post pelo ID', description: 'Esse endpoint remove um post específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Post removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Post não encontrado' })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }
}
