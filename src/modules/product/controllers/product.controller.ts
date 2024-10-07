import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/product/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Put('name/:name')
  update(
    @Param('name') name: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(name, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProductById(id);
  }

  @Delete()
  deleteMany(@Body() ids: string[]) {
    return this.productService.deleteManyProductsById(ids);
  }
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }


}
