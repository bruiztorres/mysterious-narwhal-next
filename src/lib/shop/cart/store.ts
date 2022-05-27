import { writable } from 'svelte/store';

// import { HttpError, HttpStatusCode } from '@core/http';
// import { LocalStorageService } from '@core/storage';
// import { CartService } from './service';
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
    /*    const cartId = LocalStorageService.getItem(cartlsKey);

    if (!cartId) {
      return emptyLoadedState();
    } */
    /*   try {
      const cart = await CartService.get(cartId);

      set({ loaded: true, cart });

    } catch (error) {
      if (error instanceof HttpError) {
        if (error.statusCode === HttpStatusCode.NOT_FOUND) {
          LocalStorageService.removeItem(cartlsKey);
          emptyLoadedState();
        }
      }
    } */
  }

  async function addProduct(product: CartProduct): Promise<void> {
    // const cartId = LocalStorageService.getItem(cartlsKey);

    let cart: Cart;

    /*    if (cartId) {
      cart = await CartService.addProduct(cartId, product.id, product);
    } else {
      cart = await CartService.create({ products: [product] });

      LocalStorageService.setItem(cartlsKey, cart.id);
    } */

    /* set({ loaded: true, cart }); */
  }

  async function updateProduct(product: CartProduct): Promise<void> {
    // const cartId = LocalStorageService.getItem(cartlsKey);
    /*     const cart = await CartService.updateProduct(cartId, product.id, product);

    set({ loaded: true, cart }); */
  }

  async function removeProduct(product: CartProduct): Promise<void> {
    // const cartId = LocalStorageService.getItem(cartlsKey);
    /*     const cart = await CartService.removeProduct(cartId, product.id, product);

    set({ loaded: true, cart }); */
  }

  function emptyLoadedState(): void {
    set({ ...defaultState, loaded: true });
  }

  load();

  return {
    subscribe,
    load,
    addProduct,
    updateProduct,
    removeProduct
  };
}

export const cartStore = createCartStore();
