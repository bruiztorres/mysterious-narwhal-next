<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Main from '$lib/core/layout/main.svelte';
  import LazyImage from '$lib/shared/lazy-image.svelte';
  import { AssetUrlResolver } from '$lib/core/asset';
  import { toCurrency } from '$lib/shop/utils';
  import { cartStore } from '$lib/shop/cart/store';
  import ProductOptionControl from '$lib/shop/products/shared/option.svelte';
  import type { Product, ProductOption } from '$lib/shop/products/types';
  import type { ShopProductType, ShopProductVariant } from '$lib/shop/types';

  type ProductSelection = Record<ShopProductType, string>;

  export let product: Product;

  let sizes: ShopProductVariant[] = [];
  let colors: ShopProductVariant[] = [];
  let selection: ProductSelection = { color: '', size: '' };

  $: loadOptions(product.options);
  $: selectedOption = getOptionFromSelection(selection);

  function getOptionFromSelection(selection: ProductSelection): ProductOption {
    return product.options.find((option) => {
      return option.variants.every((variant) => {
        return selection[variant.kind] === variant.value;
      });
    }) as ProductOption;
  }

  function isSameVariant(v1: ShopProductVariant, v2: ShopProductVariant) {
    return v1.kind === v2.kind && v1.value === v2.value;
  }

  function loadOptions(options: ProductOption[]): void {
    const variants = options
      .map((option) => option.variants)
      .flat()
      .filter((variant, i, self) => {
        const index = self.findIndex((v) => isSameVariant(variant, v));

        return i === index;
      });

    sizes = variants.filter((variant) => variant.kind === 'size');
    colors = variants.filter((variant) => variant.kind === 'color');

    selection.size = sizes[0]?.value;
    selection.color = colors[0]?.value;
  }

  async function addToCart(): Promise<void> {
    await cartStore.addProduct({
      id: product.id,
      name: product.name,
      thumbnailUrl: product.images[0],
      optionId: selectedOption.id,
      amount: selectedOption.amount,
      variants: selectedOption.variants,
      quantity: 1
    });
  }
</script>

<Main ariaLabelledby="product-detail-title">
  <div class="detail container-xxl">
    <section class="detail__section gallery">
      {#each product.images as imageUrl, index (index)}
        <div class="gallery__item">
          <LazyImage src={AssetUrlResolver.content(imageUrl)} alt="" />
        </div>
      {/each}
    </section>

    <section class="detail__section information">
      <h1 id="product-detail-title" class="h3">
        {product.name}
      </h1>

      {@html product.description}
    </section>

    <form class="detail__section" on:submit|preventDefault={addToCart}>
      {#if colors.length > 0}
        <h2 class="h5">Colors</h2>

        <div class="product-options my-4">
          {#each colors as { label, value }, index (index)}
            <ProductOptionControl
              name="color"
              {value}
              style="background-color: {value}"
              bind:group={selection.color}
            >
              <div class="visually-hidden">{label}</div>
            </ProductOptionControl>
          {/each}
        </div>
        <hr />
      {/if}

      {#if sizes.length > 0}
        <h2 class="h5">Size</h2>

        <div class="product-options my-4">
          {#each sizes as { value }, index (index)}
            <ProductOptionControl name="size" {value} bind:group={selection.size}>
              {value}
            </ProductOptionControl>
          {/each}
        </div>
        <hr />
      {/if}

      <div class="my-4">
        <span class="fs-3">
          {toCurrency(selectedOption.amount)}
        </span>
        <small class="fs-6 fw-normal">*VAT included</small>
      </div>

      <div class="options__submit d-grid">
        <button class="btn btn-primary" disabled={!$cartStore.loaded}> Add to cart </button>
      </div>
    </form>
  </div>
</Main>

<style type="scss">
  @use 'sass:math';
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'bootstrap/scss/mixins';
  @import 'src/styles/abstracts/variables';

  .detail {
    display: grid;
    gap: $spacer;
    padding-top: $spacer;
    padding-bottom: $spacer;
  }

  .gallery {
    display: block;
    overflow: auto hidden;
    white-space: nowrap;

    &__item {
      display: inline-block;
      height: 100%;
      width: 40vh;

      &:not(:last-child) {
        margin-right: math.div($spacer, 4);
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .detail {
      grid-template-columns: repeat(3, 1fr);
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;

      &__section {
        padding-top: $spacer;
        padding-bottom: $spacer;
      }
    }

    .gallery {
      overflow: hidden auto;
      padding-left: 0;
      padding-right: 0;

      &__item {
        display: block;
        height: auto;
        width: 100%;

        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: math.div($spacer, 2);
        }
      }
    }

    .information {
      order: -1;
    }
  }

  .product-options :global(.product-option + .product-option) {
    padding-left: math.div($spacer, 2);
  }
</style>
