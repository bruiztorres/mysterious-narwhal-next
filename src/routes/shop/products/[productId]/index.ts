import type { RequestHandler } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import type { PartialRecord } from '$lib/core/types';
import type { Product } from '$lib/shop/products/types';
import { dbConnect } from '$lib/core/db';
import { ProductModel } from '$lib/shop/products/models';
import { ProductMapper } from '$lib/shop/products/mappers';

const projection: PartialRecord<keyof Product, boolean> = {
  name: true,
  description: true,
  images: true,
  options: true
};

// GET /shop/products/[productId]
export const get: RequestHandler = async ({ params: { productId} }) => {
  await dbConnect();

  const doc = await ProductModel.findById(productId, projection);

  if (!doc) {
    return {
      status: StatusCodes.NOT_FOUND,
      error: `Resource with id: ${productId} not found`
    };
  }

  const product = ProductMapper.toProductDetail(doc);

  return { body: { product } };
};
