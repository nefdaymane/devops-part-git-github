import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from 'src/utils/response.util';
import { CreateProductCategoryDto } from '../dto/product-category/create-product-category.dto';
import { UpdateProductCategoryDto } from '../dto/product-category/update-product-category.dto';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../schema/product-category.schema';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async deleteProductCategoryById(id: string): Promise<ApiResponse<void>> {
    const productCategory = await this.productCategoryModel
      .findByIdAndDelete(id)
      .exec();

    if (!productCategory) {
      return {
        success: false,
        message: 'Product Category not found',
      };
    }

    return generateSuccessResponse(
      null,
      'Product Category deleted successfully',
    );
  }

  async deleteManyProductCategoriesById(
    ids: string[],
  ): Promise<ApiResponse<void>> {
    const productCategories = await this.productCategoryModel.deleteMany({
      _id: { $in: ids },
    });

    if (productCategories.deletedCount === 0) {
      return generateErrorResponse('Product Categories not found');
    }

    return generateSuccessResponse(
      null,
      'Product Categories deleted successfully',
    );
  }
}
