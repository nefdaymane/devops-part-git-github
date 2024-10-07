import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { productStockStateSchema } from './schema/product-stock-state.schema';
import { ProductStockStateController } from './controllers/product-stock-state.controller';
import { ProductStockStateService } from './services/product-stock-state.service';
import { productCategorySchema } from './schema/product-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'ProductCategory', schema: productCategorySchema },
      { name: 'ProductStockState', schema: productStockStateSchema },
    ]),
  ],
  controllers: [
    ProductStockStateController,
  ],
  providers: [ProductStockStateService],
  exports: [MongooseModule],
})
export class ProductModule {}
