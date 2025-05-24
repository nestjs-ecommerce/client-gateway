import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationOptionsDto } from 'src/common/dto/pagination/pagination-options.dto';
import { SERVICES_CONFIG } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(SERVICES_CONFIG.NATS_SERVICE.name) private readonly client: ClientProxy,
  ) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() createProductDto: CreateProductDto) {
    return await firstValueFrom(this.client.send({ cmd: 'update_product' }, {
      id: id,
      ...createProductDto,
    }).pipe(catchError((err) => {
      throw new RpcException(err);
    })));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.client.send({ cmd: 'find_one_product' }, {
      id: id,
    }).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Get()
  findAll(@Query() paginationOptionsDto: PaginationOptionsDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationOptionsDto);
  }
}
