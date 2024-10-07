import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { ProductService } from '../services/product.service';

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
}
