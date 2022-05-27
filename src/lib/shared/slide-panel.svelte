<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';

  import { Breakpoints } from '$lib/core/utils';
  import CrossIcon from '../../../static/icons/cross.svg';

  export let href: string;

  function slidePanelTransition() {
    const x = 650;
    const y = 800;
    const config = { duration: 350, easing: quartInOut, opacity: 1 };
    const isWidthGreaterThanMdBreakpoint = window.innerWidth > Breakpoints.MD;

    return {
      ...config,
      ...(isWidthGreaterThanMdBreakpoint ? { x } : { y })
    };
  }
</script>

<section class="slide-panel" transition:fly={slidePanelTransition()}>
  <a {href} class="text-end slide-panel__close">
    <CrossIcon />
  </a>
  <slot />
</section>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'bootstrap/scss/mixins';
  @import 'src/styles/abstracts/variables';

  $slide-panel-padding: 1.5rem;

  .slide-panel {
    background-color: $white;
    bottom: 0;
    height: 100%;
    padding: $slide-panel-padding;
    position: fixed;
    right: 0;
    overflow-y: auto;
    width: 100%;
    z-index: 1;

    @include media-breakpoint-up(md) {
      box-shadow: -1px 0px 10px rgba(0, 0, 0, 0.1);
      width: 35rem;
    }

    &__close {
      background-color: transparentize($white, 0.15);
      border-radius: 50%;
      color: $headings-color;
      padding: $slide-panel-padding * 0.5;
      position: absolute;
      top: $slide-panel-padding * 0.5;
      right: $slide-panel-padding * 0.5;
      z-index: 1;
    }
  }
</style>
