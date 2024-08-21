import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthorDto, FindAllParameters } from "./author.dto";
import { v4 as uuid } from 'uuid';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthorService {
  private authors: AuthorDto[] = [];

  constructor(private readonly userService: UserService) {}

  create(author: AuthorDto) {
    this.userService.findById(author.userId);
    author.id = uuid();
    this.authors.push(author);
    console.log(author);
  }

  findById(id: string): AuthorDto {
    const foundAuthor = this.authors.filter((author) => author.id === id);
    if (foundAuthor.length) {
      return foundAuthor[0];
    }
    throw new HttpException(
      `Author with ID ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): AuthorDto[] {
    return this.authors.filter((author) => {
      let match = true;
      if (params.tags != undefined && author.tags !== params.tags) {
        match = false;

      }
      if (params.surname != undefined && author.surname !== params.surname) {
        match = false;
      }
      if (params.completeName != undefined && author.completeName !== params.completeName) {
        match = false;
      }
      return match;
    });
  }

  update(author: AuthorDto) {
    let authorIndex = this.authors.findIndex((a) => a.id === author.id);
    if (authorIndex >= 0) {
      this.authors[authorIndex] = author;
      return;
    }
    throw new HttpException(`Author with ID ${author.id} not found`, HttpStatus.BAD_REQUEST,);
  }

  remove(id: string) {
    let authorIndex = this.authors.findIndex((a) => a.id === id);
    if (authorIndex >= 0) {
      this.authors.splice(authorIndex, 1);
      return;
    }
    throw new HttpException(
      `Author with ID ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
