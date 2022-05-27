<script lang="ts">
  import { AssetUrlResolver } from '$lib/core/asset';
  import LazyImage from '$lib/shared/lazy-image.svelte';

  import { toCurrency } from '../../utils';
  import type { ProductSlim } from '../types';

  export let product: ProductSlim;
</script>

<a href={`/shop/products/${product.id}`} class="tile" sveltekit:prefetch>
  <LazyImage src={AssetUrlResolver.content(product.thumbnailUrl)} alt="" />

  <div class="mt-1 mb-2">
    <span class="tile__title">{product.name}</span>
    <span class="tile__amount">{toCurrency(product.amount)}</span>
  </div>
</a>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  .tile {
    flex: 1;
    text-decoration: none;

    &__title {
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
</style>
