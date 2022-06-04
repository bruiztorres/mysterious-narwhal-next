import type { RequestHandler } from '@sveltejs/kit';

import type { PartialRecord } from '$lib/core/types';
import type { Product } from '$lib/shop/products/types';
import { dbConnect } from '$lib/core/db';
import { ProductModel } from '$lib/shop/products/models';
import { ProductMapper } from '$lib/shop/products/mappers';

const projection: PartialRecord<keyof Product, boolean> = {
  name: true,
  images: true,
  options: true
};

export const get: RequestHandler = async () => {
  await dbConnect();

  const docs = await ProductModel.find({}, projection);
  const products = docs.map((product) => ProductMapper.toProductSlim(product));

  return { body: { products } };
};
