<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Main from '$lib/core/layout/main.svelte';
  import ProductTile from '$lib/shop/products/shared/tile.svelte';
  import type { ProductSlim } from '$lib/shop/products/types';

  export let products: ProductSlim[] = [];
</script>

<Main ariaLabelledby="product-list-title">
  <div class="container-xxl py-3">
    <h1 id="product-list-title" class="h3">Shop</h1>

    <p>You can find some extra configurations in the detail of each product.</p>

    <div class="list">
      {#each products as product (product.id)}
        <article class="list__item">
          <ProductTile {product} />
        </article>
      {/each}
    </div>
  </div>
</Main>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'bootstrap/scss/mixins';

  $item-min-width: 15rem;

  .list {
    display: grid;
    gap: $spacer * 0.5;
    grid-template-columns: repeat(auto-fill, minmax($item-min-width, 1fr));
  }
</style>
