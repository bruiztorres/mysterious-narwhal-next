import mongoose, { type Types, type Document, type Model } from 'mongoose';

import type { Modify } from '$lib/core/types';
import type { Product, ProductOption } from './types';

type ProductModel = Modify<
  Omit<Product, 'id'>,
  {
    images: Types.Array<string>;
    options: Types.DocumentArray<ProductOption>;
  }
>;

export type ProductDocument = ProductModel & Document<string, unknown, ProductModel>;

const schema = new mongoose.Schema<ProductDocument, Model<ProductDocument>>(
  {
    name: String,
    description: String,
    images: [String],
    options: [
      {
        amount: Number,
        variants: [
          {
            kind: String,
            value: String,
            label: String
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Product', schema);
