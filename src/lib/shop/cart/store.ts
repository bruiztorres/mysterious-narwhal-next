import { writable } from 'svelte/store';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '$lib/core/http';
import { CartService } from '$lib/shop/cart/service';
import { LocalStorage } from '$lib/core/storage';
import type { Cart, CartProduct, CartState } from '$lib/shop/cart/types';

const LS_CART_KEY = 'mjdcartid';

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
    const cartId = LocalStorage.getItem(LS_CART_KEY);

    if (!cartId) {
      return setEmptyState();
    }

    try {
      const cart = await CartService.get(cartId);

      set({ loaded: true, cart });
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
          LocalStorage.removeItem(LS_CART_KEY);
          setEmptyState();
        }
      }
    }
  }

  async function addProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(LS_CART_KEY);

    let cart: Cart;

    if (cartId) {
      cart = await CartService.addProduct(cartId, product);
    } else {
      cart = await CartService.create({ products: [product] });

      LocalStorage.setItem(LS_CART_KEY, cart.id);
    }

    set({ loaded: true, cart });
  }

  async function updateProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(LS_CART_KEY);

    if (!cartId) {
      return setEmptyState();
    }

    const cart = await CartService.updateProduct(cartId, product.id, product);

    set({ loaded: true, cart });
  }

  async function removeProduct(product: CartProduct): Promise<void> {
    const cartId = LocalStorage.getItem(LS_CART_KEY);

    if (!cartId) {
      return setEmptyState();
    }

    const cart = await CartService.removeProduct(cartId, product.id, product);

    set({ loaded: true, cart });
  }

  function setEmptyState(): void {
    set({ ...defaultState, loaded: true });
  }

  load();

  return {
    subscribe,
    addProduct,
    updateProduct,
    removeProduct
  };
}

export const cartStore = createCartStore();
