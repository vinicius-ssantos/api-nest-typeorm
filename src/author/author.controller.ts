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
import { AuthorDto, FindAllParameters } from './author.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() author: AuthorDto) {
    this.authorService.create(author);
  }

  @Get('/:id')
  findById(@Param('id') id: string): AuthorDto {
    return this.authorService.findById(id);
  }

  @Get()
  findAll(@Query() params: FindAllParameters): AuthorDto[] {
    return this.authorService.findAll(params);
  }

  @Put()
  update(@Body() author: AuthorDto) {
    this.authorService.update(author);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
