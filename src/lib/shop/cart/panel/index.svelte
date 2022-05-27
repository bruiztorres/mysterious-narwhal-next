<script lang="ts">
  import { page } from '$app/stores';

  import SlidePanel from '$lib/shared/slide-panel.svelte';
  import CartDetail from '../detail/index.svelte';
</script>

{#if $page.url.hash === '#cart'}
  <SlidePanel href={$page.url.pathname}>
    <CartDetail />
  </SlidePanel>
{/if}
