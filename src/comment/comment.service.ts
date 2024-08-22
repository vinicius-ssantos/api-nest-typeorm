import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FindAllParameters, CommentDto } from "../comment/comment.dto";
import { v4 as uuid } from "uuid";
import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../db/entities/user.entity";
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { CommentEntity } from "../db/entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  private comments: CommentDto[] = [];

  async create(comment): Promise<CommentEntity> {
    const savedPost = await this.postService.findById(comment.postId);
    const savedUser = await this.userService.findById(comment.userId);
    const commentToSave: CommentEntity = {
      id: uuid(),
      text: comment.text,
      postId: savedPost.id,
      userId: savedUser.id
    };
    const createdComment = await this.commentRepository.save(commentToSave);
    return createdComment;
  }

  async findById(id: string): Promise<CommentDto> {
    const foundComment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!foundComment) {
      throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.NOT_FOUND,);
    }
    return this.mapEntityToDto(foundComment);
  }

  async findAll(params: FindAllParameters): Promise<CommentDto[]> {
    const searchParams: FindOptionsWhere<CommentEntity> = {};
    if (params.text) {
      searchParams.text = Like(`%${params.text}%`);
    }
    const commentFound = await this.commentRepository.find({
      where: searchParams,
    });
    return commentFound.map((commentEntity) => this.mapEntityToDto(commentEntity));
  }

  async update(id: string,comment: CommentDto) {
    const foundComment = await this.commentRepository.findOne({ where: { id } });
    if (!foundComment) {
      throw new HttpException(`Comment with ID ${comment.id} not found`, HttpStatus.BAD_REQUEST,);
    }
    await this.commentRepository.update(id , this.mapDtoToEntity(comment));
  }

  async remove(id: string) {
    const result = await this.commentRepository.delete(id);
    if (!result.affected) {
      throw new HttpException(`Comment with ID ${id} not found`, HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(commentEntity: CommentEntity): CommentDto {
    return {
      id: commentEntity.id,
      text: commentEntity.text,
      userId: commentEntity.userId,
      postId: commentEntity.postId,
    };
  }
  private mapDtoToEntity(comment: CommentDto): CommentDto {
    return {
      id: comment.id,
      text: comment.text,
      userId: comment.userId,
      postId: comment.postId,
    };
  }
}
