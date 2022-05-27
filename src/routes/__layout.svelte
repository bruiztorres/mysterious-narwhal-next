<script lang="ts">
  import '../app.scss';

  import Header from '$lib/core/layout/header.svelte';
  import CartPanel from '$lib/shop/cart/panel/index.svelte';
</script>

<Header />
<CartPanel />

<slot />
