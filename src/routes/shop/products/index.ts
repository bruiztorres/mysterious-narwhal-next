import type { RequestHandler } from '@sveltejs/kit';

import dbClient from '$lib/core/db';
import ProductModel from '$lib/shop/products/models';
import { ProductMapper } from '$lib/shop/products/mappers';

const projection = {
  name: true,
  images: true,
  options: true
};

export const get: RequestHandler = async () => {
  await dbClient();

  const products = (await ProductModel.find({}, projection)).map((product) =>
    ProductMapper.toProductSlim(product)
  );

  return { body: { products } };
};
