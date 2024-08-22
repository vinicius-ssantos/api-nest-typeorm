import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PostDto{
    @IsUUID()
    @IsOptional()
    id: string;

    @ApiProperty( )
    @IsUUID()
    authorId: string;

    @ApiProperty( )
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;

    @ApiProperty( )
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    text: string;

}

export interface FindAllParameters {
    title: string;
    text: string;
}

export class TaskRouteParameters {
    @IsUUID()
    id:string;
}
