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
import {
  AuthorDto,
  FindAllParameters,
  TaskRouteParameters,
} from './author.dto';
import { AuthorService } from './author.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}


  @ApiOperation({ summary: 'Cria um novo autor', description: 'Esse endpoint cria um novo autor no sistema' })
  @ApiBody({
    description: 'Dados do autor',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          tags: 'Tag 1, Tag 2',
          surname: 'Sobrenome do autor',
          completeName: 'Nome completo do autor'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Autor criado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
        tags: 'Tag 1, Tag 2',
        surname: 'Sobrenome do autor',
        completeName: 'Nome completo do autor'
      }
    } })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async create(@Body() author: AuthorDto): Promise<AuthorDto> {
    return await this.authorService.create(author);
  }


  @ApiOperation({ summary: 'Retorna um autor pelo ID', description: 'Esse endpoint retorna os detalhes de um autor específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Autor retornado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
        tags: 'Tag 1, Tag 2',
        surname: 'Sobrenome do autor',
        completeName: 'Nome completo do autor'
      }
    } })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.findById(id);
  }


  @ApiOperation({ summary: 'Retorna todos os autores', description: 'Esse endpoint retorna uma lista de todos os autores no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de autores retornada com sucesso',
    schema: {
      example: [
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          tags: 'Tag 1, Tag 2',
          surname: 'Sobrenome do autor',
          completeName: 'Nome completo do autor'
        },
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          tags: 'Tag 1, Tag 2',
          surname: 'Sobrenome do autor',
          completeName: 'Nome completo do autor'
        }
      ]
    } })
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<AuthorDto[]> {
    return await this.authorService.findAll(params);
  }


  @ApiOperation({ summary: 'Atualiza um autor pelo ID', description: 'Esse endpoint atualiza os detalhes de um autor específico pelo ID' })
  @ApiBody({
    description: 'Dados do autor',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          userId: '9b01f820-6c17-4a0d-bd09-b213ac93f421',
          tags: 'Tag 1, Tag 2',
          surname: 'Sobrenome do autor',
          completeName: 'Nome completo do autor'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Autor atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() author: AuthorDto) {
    await this.authorService.update(params.id, author);
  }

  @ApiOperation({ summary: 'Remove um autor pelo ID', description: 'Esse endpoint remove um autor específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Autor removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Autor não encontrado' })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(id);
  }
}
