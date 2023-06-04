import {CreateOrderDto} from "./create_order.dto";
import {IsString} from "class-validator";

export class UpdateOrderDto extends CreateOrderDto {
    @IsString()
    orderId: string
}