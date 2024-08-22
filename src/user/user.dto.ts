import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;
  @IsEmail()
  email: string;
}

export interface FindAllParameters {
  name: string;
  email: string;
}

export class TaskRouteParameters {
  @IsUUID()
  id:string;
}
