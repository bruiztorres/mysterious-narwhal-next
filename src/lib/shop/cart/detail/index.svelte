<script lang="ts">
  import { AssetUrlResolver } from '$lib/core/asset';
  import LazyImage from '$lib/shared/lazy-image.svelte';
  import type { CartProduct } from '../types';
  import { toCurrency } from '../../utils';
  import { cartStore } from '../store';

  async function removeProduct(product: CartProduct): Promise<void> {
    await cartStore.removeProduct(product);
  }

  async function handleProductChange(product: CartProduct, event: Event): Promise<void> {
    const element = event.target as HTMLSelectElement;
    const quantity = +element.value;
    const productToUpdate = { ...product, quantity };

    await cartStore.updateProduct(productToUpdate);
  }
</script>

<h1 class="h4 mb-4">
  Your basket
  <span class="fw-normal fs-5 ms-1">
    ({$cartStore.cart.quantity})
  </span>
</h1>

{#if !$cartStore.loaded}
  Loading...
{:else if $cartStore.cart.products.length === 0}
  No items found
{:else}
  <div class="cart-items">
    {#each $cartStore.cart.products as product, index (index)}
      <div class="cart-item">
        <div class="cart-item__preview">
          <LazyImage src={AssetUrlResolver.content(product.thumbnailUrl)} alt="" />
        </div>

        <div class="d-flex flex-column justify-content-between">
          <div>
            <div class="cart-item__name mb-1">
              {product.name}
            </div>

            <p class="mb-3">
              {#each product.variants as variant (variant.kind)}
                <span class="cart-item__option">
                  {variant.label}
                </span>
              {/each}
            </p>

            <select
              class="form-select cart-item__quantity"
              value={product.quantity}
              on:change={(event) => handleProductChange(product, event)}
            >
              {#each [1, 2, 3, 4, 5] as quantity (quantity)}
                <option>{quantity}</option>
              {/each}
            </select>
          </div>
          <div>
            <button
              class="btn btn-sm btn-link px-0 text-muted"
              on:click={() => removeProduct(product)}
            >
              Remove Item
            </button>
          </div>
        </div>
        <div class="cart-item__amount text-end">
          {toCurrency(product.quantity * product.amount)}
        </div>
      </div>
      <hr />
    {/each}
  </div>

  <div class="cart-item__amount my-4">
    <span class="fs-3">Total {toCurrency($cartStore.cart.amount)}</span>
    <small class="fs-6 fw-normal">*VAT included</small>
  </div>

  <div class="d-grid">
    <a href="/shop/checkout" class="btn btn-primary">Checkout</a>
  </div>
{/if}

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  .cart-item {
    display: flex;

    &__preview {
      width: 10rem;
      padding-right: 1rem;
    }

    &__name {
      font-weight: 600;
    }

    &__quantity {
      width: auto;
      margin-bottom: $spacer;
    }

    &__amount {
      flex: 1;
      font-size: 1.25rem;
      padding-left: 1rem;
      text-align: right;
    }

    &__option {
      text-transform: capitalize;
    }

    &__option + &__option {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      border-left: 1px solid $gray-300;
    }
  }
</style>
