import { writable } from 'svelte/store';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '$lib/core/http';
import { CartService } from '$lib/shop/cart/service';
import { LocalStorage } from '$lib/core/storage';
import type { Cart, CartProduct, CartState } from './types';

const cartlsKey = 'mjdcartid';
const defaultState: CartState = {
  loaded: false,
  cart: {
    id: '',
    amount: 0,
    quantity: 0,
    products: []
  }
};

function createCartStore() {
  const { subscribe, set } = writable<CartState>(defaultState);

  async function load(): Promise<void> {
    const cartId = LocalStorage.getItem(cartlsKey) as string;

    if (!cartId) {
      return emptyState();
    }

    try {
      const cart = await CartService.get(cartId);

      set({ loaded: true, cart });
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
          LocalStorage.removeItem(cartlsKey);
          emptyState();
        }
      }
    }
  }

  async function addProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(cartlsKey) as string;

    let cart: Cart;

    if (cartId) {
      cart = await CartService.addProduct(cartId, product.id, product);
    } else {
      cart = await CartService.create({ products: [product] });

      LocalStorage.setItem(cartlsKey, cart.id);
    }

    set({ loaded: true, cart });
  }

  async function updateProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(cartlsKey) as string;
    const cart = await CartService.updateProduct(cartId, product.id, product);

    set({ loaded: true, cart });
  }

  async function removeProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(cartlsKey) as string;
    const cart = await CartService.removeProduct(cartId, product.id, product);

    set({ loaded: true, cart });
  }

  function emptyState(): void {
    set({ ...defaultState, loaded: true });
  }

  load();

  return {
    load,
    subscribe,
    addProduct,
    updateProduct,
    removeProduct
  };
}

export const cartStore = createCartStore();
