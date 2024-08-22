import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";

import { CommentService } from "./comment.service";
import { CommentDto, FindAllParameters, TaskRouteParameters } from "./comment.dto";
import { CommentEntity } from "../db/entities/comment.entity";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService:CommentService ) {}


  @ApiOperation({ summary: 'Cria um novo comentário', description: 'Esse endpoint cria um novo comentário no sistema' })
  @ApiBody({
    description: 'Dados do comentário',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          text: 'Novo comentário',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Comentário criado com sucesso',
    schema: {
      example: {
        id: '9b01f820-6c17-4a0d-bd09-b213ac93f423',
        text: 'Novo comentário',
        postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
        userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
      }
    } })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async  create(@Body() comment: CommentDto):Promise<CommentEntity> {
  return await  this.commentService.create(comment);
  }


  @ApiOperation({ summary: 'Retorna todos os comentários', description: 'Esse endpoint retorna uma lista de todos os comentários no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de comentários retornada com sucesso',
    schema: {
      example: [
        {
          id: '9b01f820-6c17-4a0d-bd09-b213ac93f423',
          text: 'Comentário 1',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        },
        {
          id: '9b01f820-6c17-4a0d-bd09-b213ac93f424',
          text: 'Comentário 2',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        }
      ]
    } })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<CommentDto> {
    return await this.commentService.findById(id);
  }


  @ApiOperation({ summary: 'Retorna todos os comentários', description: 'Esse endpoint retorna uma lista de todos os comentários no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de comentários retornada com sucesso',
    schema: {
      example: [
        {
          id: '9b01f820-6c17-4a0d-bd09-b213ac93f423',
          text: 'Comentário 1',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        },
        {
          id: '9b01f820-6c17-4a0d-bd09-b213ac93f424',
          text: 'Comentário 2',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        }
      ]
    } })
  @Get()
  async  findAll(@Query() params: FindAllParameters): Promise<CommentDto[]> {
    return await this.commentService.findAll(params);
  }


  @ApiOperation({ summary: 'Atualiza um comentário pelo ID', description: 'Esse endpoint atualiza os detalhes de um comentário específico pelo ID' })
  @ApiBody({
    description: 'Dados do comentário',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          text: 'Comentário atualizado',
          postId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f422'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Comentário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @Put('/:id')
  async  update(@Param() params: TaskRouteParameters,@Body() comment: CommentDto) {
    await   this.commentService.update(params.id,comment);
  }

  @ApiOperation({ summary: 'Remove um comentário pelo ID', description: 'Esse endpoint remove um comentário específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Comentário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @Delete('/:id')
  async  remove(@Param('id') id: string) {
    return await this.commentService.remove(id);
  }
  
}
