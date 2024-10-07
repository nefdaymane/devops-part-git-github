import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  costPrice: number;

  @Prop()
  sku: string;

  @Prop()
  stockedQuantity: number;

  @Prop({ type: Types.ObjectId, ref: 'ProductCategory' })
  productCategory: ProductCategory | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductStockState' })
  productStockState: ProductStockState | Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
