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

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() author: AuthorDto): Promise<AuthorDto> {
    return await this.authorService.create(author);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<AuthorDto> {
    return await this.authorService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<AuthorDto[]> {
    return await this.authorService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() author: AuthorDto) {
    await this.authorService.update(params.id, author);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(id);
  }
}
