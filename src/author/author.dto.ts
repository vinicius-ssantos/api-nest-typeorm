import { UserDto } from "../user/user.dto";
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class AuthorDto {
  @IsString()
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

export class TaskRouteParameters {
  @IsUUID()
  id:string;
}
