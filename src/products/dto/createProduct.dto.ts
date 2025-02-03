import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    body: string

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image: string

    @IsNumber()
    @IsOptional()
    stars: number

    @IsNumber()
    @IsNotEmpty()
    price: number
}