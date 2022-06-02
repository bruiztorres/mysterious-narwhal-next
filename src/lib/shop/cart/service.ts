import { http } from '$lib/core/http';
import type {
  Cart,
  CartCreateRequest,
  CartProductAddRequest,
  CartProductUpdateRequest,
  CartProductDeleteRequest,
  PaymentIntentResponse,
  CreatePaymentIntentRequest
} from './types';

class CartService {
  private readonly cartUrl = '/shop/cart';

  public create(request: CartCreateRequest): Promise<Cart> {
    return http.post<CartCreateRequest, Cart>(this.cartUrl, request);
  }

  public get(id: string): Promise<Cart> {
    return http.get<Cart>(this.cartUrl + '/' + id);
  }

  public addProduct(id: string, productId: string, request: CartProductAddRequest): Promise<Cart> {
    const url = this.cartUrl + '/' + id + '/products/' + productId;

    return http.post<CartProductAddRequest, Cart>(url, request);
  }

  public updateProduct(
    id: string,
    productId: string,
    request: CartProductUpdateRequest
  ): Promise<Cart> {
    const url = this.cartUrl + '/' + id + '/products/' + productId;

    return http.put<CartProductUpdateRequest, Cart>(url, request);
  }

  public removeProduct(
    id: string,
    productId: string,
    request: CartProductDeleteRequest
  ): Promise<Cart> {
    const url = this.cartUrl + '/' + id + '/products/' + productId;

    return http.delete<CartProductDeleteRequest, Cart>(url, request);
  }

  public createPaymentIntent(
    id: string,
    request: CreatePaymentIntentRequest
  ): Promise<PaymentIntentResponse> {
    const url = this.cartUrl + '/' + id + '/paymentIntent';

    return http.post<CreatePaymentIntentRequest, PaymentIntentResponse>(url, request);
  }
}

const instance = new CartService();

export { instance as CartService };
