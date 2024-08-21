import { UserDto } from "../user/user.dto";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class AuthorDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  tags: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  completeName: string;
}


export interface FindAllParameters {
  tags: string;
  surname: string;
  completeName: string;
}