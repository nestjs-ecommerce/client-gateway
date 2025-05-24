import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SERVICES_CONFIG } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationOrderOptionsDto } from './dto/pagination-options-order.dto';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(SERVICES_CONFIG.ORDERS_SERVICE.name)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create_order' }, createOrderDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Get()
  findAll(@Query() paginationOrderOptions: PaginationOrderOptionsDto) {
    return this.client.send({ cmd: 'find_all_orders' }, {
      ...paginationOrderOptions,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_order' }, { id }).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.client.send({ cmd: 'update_order' }, { id, updateOrderDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove_order' }, { id });
  }
}
