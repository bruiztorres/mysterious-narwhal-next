export type ShopProductType = 'color' | 'size';

export type ShopProductVariant = {
  label: string;
  value: string;
  kind: ShopProductType;
};
