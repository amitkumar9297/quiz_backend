import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuizDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @IsNotEmpty()
    @IsString()
    createdBy: number; // User ID of the admin

    @IsOptional()
    @IsString({ each: true }) // Optional list of question IDs
    questions?: string[];
}

export class UpdateQuizDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}