import { PartialType } from "@nestjs/mapped-types";
import { IsEnum, IsOptional } from "class-validator";
import { PaginationOptionsDto } from "src/common/dto/pagination/pagination-options.dto";
import { OrderStatus } from "../enum/status-order.enum";

export class PaginationOrderOptionsDto extends PartialType(PaginationOptionsDto) {
    @IsOptional()
    @IsEnum(OrderStatus)    
    readonly status?: OrderStatus = OrderStatus.PENDING;
}