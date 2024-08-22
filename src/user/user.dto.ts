import { IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import {  ApiProperty } from "@nestjs/swagger";

export class UserDto {

  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty( )
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty( )
  @IsEmail({ }, { message: 'email inválido'  })
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
