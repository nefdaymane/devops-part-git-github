import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { Product, ProductDocument } from '../schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { Model } from 'mongoose';
import { ProductStockState } from '../schema/product-stock-state.schema';
import { Types } from 'mongoose';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from 'src/utils/response.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
    @InjectModel(ProductStockState.name)
    private productStockStateModel: Model<ProductStockState>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ApiResponse<Product>> {
    const existingProduct = await this.productModel.findOne({
      name: createProductDto.name,
    });

    if (existingProduct) {
      return generateErrorResponse('Product already exists');
    }

    const productCategory = await this.productCategoryModel.findOne({
      name: createProductDto.productCategoryName,
    });

    if (createProductDto.productCategoryName && !productCategory) {
      return generateErrorResponse('productCategory not found');
    }

    const productStockState = await this.productStockStateModel.findOne({
      name: createProductDto.productStockStateName,
    });

    if (createProductDto.productStockStateName && !productStockState) {
      return generateErrorResponse('productStockState not found');
    }

    const product = new this.productModel(createProductDto);
    await product.save();

    for (const orderItemDto of createProductDto.orderItems) {
      const orderItemData: CreateOrderItemDto = {
        ...orderItemDto,
        product: product._id as Types.ObjectId,
      };
      const orderItemResponse =
        await this.orderItemService.createOrderItem(orderItemData);
      if (!orderItemResponse.success) {
        return generateErrorResponse('Failed to create OrderItem');
      }

      return generateSuccessResponse(
        product.toObject(),
        'Product created successfully',
      );
    }
  }

  async findAll(): Promise<ApiResponse<Product[]>> {
    const products = await this.productModel.find().exec();
    return generateSuccessResponse(
      products.map((product) => product.toObject()),
      'Products found successfully',
    );
  }

  async findById(id: string): Promise<ApiResponse<Product>> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      return generateErrorResponse('Product not found');
    }

    return generateSuccessResponse(
      product.toObject(),
      'Product found successfully',
    );
  }

  async findByName(name: string): Promise<ApiResponse<Product>> {
    const product = await this.productModel.findOne({ name }).exec();

    if (!product) {
      return generateErrorResponse('Product not found');
    }

    return generateSuccessResponse(
      product.toObject(),
      'Product found successfully',
    );
  }

  
}
