import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto{
    @IsUUID()
    @IsOptional()
    id: string;

    @ApiProperty( )
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    text: string;

    @ApiProperty( )
    @IsUUID()
    postId: string;

    @ApiProperty( )
    @IsUUID()
    userId: string;
}

export interface FindAllParameters {
    text: string;

}
export class TaskRouteParameters {
    @IsUUID()
    id:string;
}
