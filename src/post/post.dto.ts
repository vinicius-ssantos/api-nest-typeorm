import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class PostDto{
    @IsUUID()
    @IsOptional()
    id: string;
    @IsUUID()
    authorId: string;
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string;
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
