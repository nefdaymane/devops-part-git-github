import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { productCategorySchema } from './schema/product-category.schema';
import { productStockStateSchema } from './schema/product-stock-state.schema';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'ProductCategory', schema: productCategorySchema },
      { name: 'ProductStockState', schema: productStockStateSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [MongooseModule],
})
export class ProductModule {}
