import {IsNumber, IsObject, IsString} from "class-validator";

export class ProductDto {
    @IsNumber()
    id: number;
    @IsString()
    title: string;
    @IsNumber()
    price: number;
    @IsString()
    description: string;
    @IsString()
    category: string;
    @IsString()
    image: string;
    @IsObject()
    rating: {
        rate: number;
        count: number;
    };
}