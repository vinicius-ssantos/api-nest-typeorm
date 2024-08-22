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
import { UserService } from './user.service';
import { FindAllParameters, TaskRouteParameters, UserDto } from './user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cria um novo usuário', description: 'Esse endpoint cria um novo usuário no sistema' })
  @ApiBody({
    description: 'Dados do usuário',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          name: 'Robertinho',
          email: 'robertinho@email.com'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    } })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    return await this.userService.create(user);
  }


  @ApiOperation({ summary: 'Retorna um usuário pelo ID', description: 'Esse endpoint retorna os detalhes de um usuário específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso',
    schema: {
      example: {
        id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    } })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findById(id);
  }


  @ApiOperation({ summary: 'Retorna todos os usuarios', description: 'Esse endpoint retorna uma lista de todos os usuarios no sistema' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso',
    schema: {
      example: [
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f421",
          name: 'John Doe',
          email: 'johndoe@example.com'
        },
        {
          id: "9b01f820-6c17-4a0d-bd09-b213ac93f422",
          name: 'Jane Doe',
          email: 'janedoe@example.com'
        }
      ]
    } })
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<UserDto[]> {
    return await this.userService.findAll(params);
  }


  @ApiOperation({ summary: 'Atualiza um usuário pelo ID', description: 'Esse endpoint atualiza os detalhes de um usuário específico pelo ID' })
  @ApiBody({
    description: 'Dados do usuário',
    examples: {
      example1: {
        summary: 'Example 1',
        value: {
          name: 'Robertinho',
          email: 'robertinho@email.com'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() user: UserDto) {
    await this.userService.update(params.id, user);
  }


  @ApiOperation({ summary: 'Remove um usuário pelo ID', description: 'Esse endpoint remove um usuário específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
