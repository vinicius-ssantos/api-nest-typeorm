import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CommentDto{
    @IsUUID()
    @IsOptional()
    id: string;
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    text: string;
    @IsUUID()
    postId: string;
    @IsUUID()
    userId: string;
}

export interface FindAllParameters {
    text: string;

}
