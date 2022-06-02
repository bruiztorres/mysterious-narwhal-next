import type { RequestHandler } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

import dbClient from '$lib/core/db';
import ProductModel from '$lib/shop/products/models';
import { ProductMapper } from '$lib/shop/products/mappers';

const projection = {
  name: true,
  description: true,
  images: true,
  options: true
};

export const get: RequestHandler = async ({ params }) => {
  await dbClient();

  const id = params.slug;
  const document = await ProductModel.findById(id, projection);

  if (!document) {
    return {
      status: StatusCodes.NOT_FOUND,
      error: `Resource with id: ${id} not found`
    };
  }

  const product = ProductMapper.toProductDetail(document);

  return { body: { product } };
};
