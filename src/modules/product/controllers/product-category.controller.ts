import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductCategoryService } from '../services/product-category.service';
import { CreateProductCategoryDto } from '../dto/product-category/create-product-category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.createProductCategory(
      createProductCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productCategoryService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.productCategoryService.findByName(name);
  }
}
