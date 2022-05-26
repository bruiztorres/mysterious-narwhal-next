<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Main from '$lib/core/layout/main.svelte';
  import { AssetUrlResolver } from '$lib/core/asset';
  import LazyImage from '$lib/shared/lazy-image.svelte';
  import type {
    ProductOption,
    ProductDetail,
    ProductVariant,
    ProductVariantSelection
  } from '$lib/shop/products/types';

  import { toCurrency } from '$lib/shop/utils';
  import ProductOptionControl from '$lib/shop/products/shared/option.svelte';

  export let product: ProductDetail;

  let sizes: ProductVariant[] = [];
  let colors: ProductVariant[] = [];
  let selection: ProductVariantSelection = { color: '', size: '' };

  $: loadOptions(product.options);

  function getOptionFromSelection(
    product: ProductDetail,
    selection: ProductVariantSelection
  ): ProductOption | undefined {
    return product.options.find((option) => {
      return option.variants.every((variant) => {
        return selection[variant.kind] === variant.value;
      });
    });
  }

  function loadOptions(options: ProductOption[]): void {
    const variants = options
      .map((option) => option.variants)
      .flat()
      .filter((variant, index, self) => {
        return (
          self.findIndex((v) => v.kind === variant.kind && v.value === variant.value) === index
        );
      });

    sizes = variants.filter((variant) => variant.kind === 'size');
    colors = variants.filter((variant) => variant.kind === 'color');

    selection.size = sizes[0]?.value;
    selection.color = colors[0]?.value;
  }

  async function addToCart(
    product: ProductDetail,
    selection: ProductVariantSelection
  ): Promise<void> {
    const option = getOptionFromSelection(product, selection);

    /*     await cartStore.addProduct({
      id: product.id,
      name: product.name,
      thumbnailUrl: product.images[0],
      optionId: option.id,
      amount: option.amount,
      quantity: 1,
      variants: option.variants
    }); */
  }

  function calcSelectionAmount(product: ProductDetail, selection: ProductVariantSelection): number {
    const option = getOptionFromSelection(product, selection) ?? { amount: 0 };

    return option.amount;
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

    <form class="detail__section" on:submit|preventDefault={() => addToCart(product, selection)}>
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
          {toCurrency(calcSelectionAmount(product, selection))}
        </span>
        <small class="fs-6 fw-normal">*VAT included</small>
      </div>

      <div class="options__submit d-grid">
        <button class="btn btn-primary" disabled={!product.id}>Add to cart</button>
      </div>
    </form>
  </div>
</Main>

<style type="scss">
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
        margin-right: $spacer * 0.25;
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
          margin-bottom: $spacer * 0.5;
        }
      }
    }

    .information {
      order: -1;
    }
  }

  .product-options :global(.product-option + .product-option) {
    padding-left: $spacer * 0.5;
  }
</style>
