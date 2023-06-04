import {OrderStatus} from "../utils/enum/order_status.enum";
import {IsArray, IsOptional, IsString} from "class-validator";
import {ProductDto} from "./product.dto";

export class CreateOrderDto {
    @IsArray()
    productList: ProductDto[];
    @IsOptional()
    date: Date;
    @IsOptional()
    status: OrderStatus
    @IsString()
    user: string
}