import type { RequestHandler } from '@sveltejs/kit';

import type { PartialRecord } from '$lib/core/types';
import type { Product } from '$lib/shop/products/types';
import { dbConnect } from '$lib/core/db';
import { ProductModel } from '$lib/shop/products/models';
import { ProductMapper } from '$lib/shop/products/mappers';
import type { PipelineStage } from 'mongoose';

const projection: PartialRecord<keyof Product, boolean> = {
  name: true,
  images: true,
  options: true
};

// GET /shop/products
export const get: RequestHandler = async () => {
  await dbConnect();

  const sort: PipelineStage = { $sort: { _id: -1 } };
  const project: PipelineStage = { $project: projection };
  const docs = await ProductModel.aggregate([project, sort]);
  const products = docs.map((product) => ProductMapper.toProductSlim(product));

  return { body: { products } };
};
