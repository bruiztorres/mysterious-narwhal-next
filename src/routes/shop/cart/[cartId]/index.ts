import type { RequestHandler } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import { dbConnect } from '$lib/core/db';
import { CartModel } from '$lib/shop/cart/models';
import { CartMapper } from '$lib/shop/cart/mappers';

export const get: RequestHandler = async ({ params: { cartId } }) => {
  await dbConnect();

  const doc = await CartModel.findById(cartId);

  if (!doc) {
    return {
      status: StatusCodes.NOT_FOUND,
      error: `Resource with id: ${cartId} not found`
    };
  }

  const cart = CartMapper.toCart(doc);

  return {
    body: cart
  };
};
