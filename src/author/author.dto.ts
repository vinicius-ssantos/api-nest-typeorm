import { IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "../user/user.dto";

export class AuthorDto {

  @ApiProperty( )
  @IsString()
  userId: string;

  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty( )
  @IsString()
  @IsOptional()
  tags: string;

  @ApiProperty( )
  @IsString()
  @IsOptional()
  surname: string;

  @ApiProperty( )
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
