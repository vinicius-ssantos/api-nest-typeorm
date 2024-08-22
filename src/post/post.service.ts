import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { FindAllParameters, PostDto } from './post.dto';
import { AuthorService } from '../author/author.service';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { PostEntity } from '../db/entities/post.entity';
import { AuthorEntity } from '../db/entities/author.entity';
import { UserDto } from '../user/user.dto';
import { UserEntity } from '../db/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly authorService: AuthorService,
  ) {}

  private posts: PostDto[] = [];

  async create(post: PostDto): Promise<PostDto> {
    const savedAuthor = await this.authorService.findById(post.authorId);
    const postToSave: PostEntity = {
      id: uuid(),
      authorId: savedAuthor.id,
      title: post.title,
      text: post.text,
    };
    const createdPost = await this.postRepository.save(postToSave);
    return this.mapEntityToDto(createdPost);
  }

  async findById(id: string): Promise<PostDto> {
    const foundPost = await this.postRepository.findOne({ where: { id } });

    if (!foundPost) {
      throw new HttpException(
        `Post with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.mapEntityToDto(foundPost);
  }

  async findAll(params: FindAllParameters): Promise<PostDto[]> {
    const searchParams: FindOptionsWhere<PostEntity> = {};
    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }
    if (params.text) {
      searchParams.text = Like(`%${params.text}%`);
    }
    const postFound = await this.postRepository.find({
      where: searchParams,
    });
    return postFound.map((postEntity) => this.mapEntityToDto(postEntity));
  }

  async update(id: string, post: PostDto) {
    const postFound = await this.postRepository.findOne({ where: { id } });
    if (!postFound) {
      throw new HttpException(
        `Post with ID ${post.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.postRepository.update(id, this.mapDtoToEntity(post));
  }

  async remove(id: string) {
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new HttpException(
        `Post with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(postEntity: PostEntity): PostDto {
    return {
      id: postEntity.id,
      authorId: postEntity.authorId,
      title: postEntity.title,
      text: postEntity.text,
    };
  }

  private mapDtoToEntity(post: PostDto): PostEntity {
    return {
      id: post.id,
      title: post.title,
      text: post.text,
      authorId: post.authorId,
    };
  }
}
