import type { ShopProductVariant } from '../types';

export type CartState = {
  loaded: boolean;
  cart: Cart;
};

export type CartProduct = {
  id: string;
  name: string;
  thumbnailUrl: string;
  optionId: string;
  amount: number;
  quantity: number;
  variants: ShopProductVariant[];
};

export type Cart = {
  id: string;
  amount: number;
  quantity: number;
  products: CartProduct[];
};

export type CartCreateRequest = {
  products: CartProductRequest[];
};

export type CartProductAddRequest = Omit<CartProductRequest, 'id'>;
export type CartProductUpdateRequest = Omit<CartProductRequest, 'id'>;

export type CartProductDeleteRequest = {
  optionId: string;
};

export type CartProductRequest = {
  id: string;
  name: string;
  thumbnailUrl: string;
  optionId: string;
  amount: number;
  quantity: number;
  variants: CartProductVariantRequest[];
};

export type CartProductVariantRequest = ShopProductVariant;

export type PaymentIntentResponse = {
  clientSecret: string;
};

export type CreatePaymentIntentRequest = {
  currency: string;
  items: {
    id: string;
    optionId: string;
    amount: number;
    quantity: number;
  }[];
};
