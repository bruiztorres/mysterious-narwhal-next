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
  variants: ProductVariant[];
};

export type ProductKind = 'color' | 'size';

export type ProductVariant = {
  label: string;
  value: string;
  kind: ProductKind;
};

export type ProductState = {
  loaded: boolean;
  products: ProductSlim[];
};

export type ProductVariantSelection = Record<ProductKind, string>;
