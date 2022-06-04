import mongoose, { type Document, type Model } from 'mongoose';

import type { WithoutId } from '$lib/core/types';
import type { Cart } from './types';

type CartModel = WithoutId<Cart>;

export type CartDocument = CartModel & Document<string, unknown, CartModel>;

const schema = new mongoose.Schema<CartDocument, Model<CartDocument>>(
  {
    amount: Number,
    quantity: Number,
    products: [
      {
        _id: false,
        productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
        optionId: mongoose.Types.ObjectId,
        quantity: Number
      }
    ]
  },
  { timestamps: true }
);

schema.pre<CartModel>('save', function (next) {
  let amount = 0;
  let quantity = 0;

  this.products.forEach((item) => {
    quantity += item.quantity;
    amount += item.amount * item.quantity;
  });

  this.quantity = quantity;
  this.amount = amount;

  next();
});

export const CartModel = mongoose.model('Cart', schema);
