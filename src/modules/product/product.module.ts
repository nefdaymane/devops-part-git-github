import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { productCategorySchema } from './schema/product-category.schema';
import { productStockStateSchema } from './schema/product-stock-state.schema';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { OrderModule } from 'src/modules/shop-management/order/order.module';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductStockStateController } from './controllers/product-stock-state.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductStockStateService } from './services/product-stock-state.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'ProductCategory', schema: productCategorySchema },
      { name: 'ProductStockState', schema: productStockStateSchema },
    ]),
    forwardRef(() => OrderModule),
  ],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductStockStateController,
  ],
  providers: [ProductService, ProductCategoryService, ProductStockStateService],
  exports: [MongooseModule],
})
export class ProductModule {}
