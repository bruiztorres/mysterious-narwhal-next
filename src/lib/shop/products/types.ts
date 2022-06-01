import type { ShopProductType, ShopProductVariant } from '../types';

export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  options: ProductOption[];
};

export type ProductSlim = Pick<Product, 'id' | 'name'> & {
  thumbnailUrl: string;
  amount: number;
};

export type ProductOption = {
  id: string;
  amount: number;
  variants: ShopProductVariant[];
};

export type ProductState = {
  loaded: boolean;
  products: ProductSlim[];
};
