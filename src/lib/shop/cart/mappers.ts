import type { CartDocument } from './models';
import type { Cart } from './types';

export class CartMapper {
  static toCart(document: CartDocument): Cart {
    return {
      id: document._id as string,
      amount: document.amount,
      quantity: document.quantity,
      products: document.products
    };
  }
}
