import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorDto, FindAllParameters } from './author.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { AuthorEntity } from '../db/entities/author.entity';

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async create(author: AuthorDto): Promise<AuthorDto> {
    const authorToSave: AuthorEntity = {
      id: uuid(),
      userId: author.userId,
      tags: author.tags,
      surname: author.surname,
      completeName: author.completeName,
    };
    const createdAuthor = await this.authorRepository.save(authorToSave);
    return this.mapEntityToDto(createdAuthor);
  }

  async findById(id: string): Promise<AuthorDto> {
    const foundAuthor = await this.authorRepository.findOne({ where: { id } });
    if (!foundAuthor) {
      throw new HttpException(
        `Author with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.mapEntityToDto(foundAuthor);
  }

  async findAll(params: FindAllParameters): Promise<AuthorDto[]> {
    const searchParams: FindOptionsWhere<AuthorEntity> = {};
    if (params.tags) {
      searchParams.tags = Like(`%${params.tags}%`);
    }
    if (params.surname) {
      searchParams.surname = Like(`%${params.surname}%`);
    }
    if (params.completeName) {
      searchParams.completeName = Like(`%${params.completeName}%`);
    }
    const authorFound = await this.authorRepository.find({
      where: searchParams,
    });
    return authorFound.map((authorEntity) => this.mapEntityToDto(authorEntity));
  }

  async update(id: string,author: AuthorDto) {
    const foundAuthor = await this.authorRepository.findOne({ where: { id } });
    if (!foundAuthor) {
      throw new HttpException(`Author with ID ${author.id} not found`, HttpStatus.BAD_REQUEST,);
    }
    await this.authorRepository.update(id , this.mapDtoToEntity(author));
  }

  async remove(id: string) {
    const result = await this.authorRepository.delete(id);
    if (!result.affected) {
      throw new HttpException(`Author with ID ${id} not found`, HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(authorEntity: AuthorEntity): AuthorDto {
    return {
      id: authorEntity.id,
      userId: authorEntity.userId,
      tags: authorEntity.tags,
      surname: authorEntity.surname,
      completeName: authorEntity.completeName,
    };
  }

  private mapDtoToEntity(authorDto: AuthorDto): Partial<AuthorEntity> {
    return {
      id: authorDto.id,
      userId: authorDto.userId,
      tags: authorDto.tags,
      surname: authorDto.surname,
      completeName: authorDto.completeName,
    };
  }
}
