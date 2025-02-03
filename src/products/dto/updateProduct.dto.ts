import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class UpdateProductDto {
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

    @IsString()
    @IsOptional()
    stars: number

    @IsNumber()
    @IsOptional()
    price: number
}