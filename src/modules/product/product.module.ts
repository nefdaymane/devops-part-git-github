import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
    ]),
    forwardRef(() => OrderModule),
  ],
  controllers: [
    ProductController
  ],
  providers: [ProductService],
  exports: [MongooseModule],
})
export class ProductModule {}
