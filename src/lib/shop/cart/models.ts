import mongoose from 'mongoose';
import type { Types, Document, Model } from 'mongoose';

import type { Modify } from '$lib/core/types';
import type { Cart, CartProduct } from './types';

type CartModel = Modify<
  Omit<Cart, 'id'>,
  {
    products: Types.DocumentArray<CartProduct>;
  }
>;

export type CartDocument = CartModel & Document<string, unknown, CartModel>;

const schema = new mongoose.Schema<CartDocument, Model<CartDocument>>(
  {
    amount: Number,
    quantity: Number,
    products: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
        optionId: mongoose.Types.ObjectId,
        quantity: Number
      }
    ]
  },
  { timestamps: true }
);

schema.pre<CartModel>('save', function (next) {
  console.log('PreSave ............');
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

export default mongoose.model('Cart', schema);
