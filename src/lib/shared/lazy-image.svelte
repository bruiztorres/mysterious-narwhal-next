<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<div class="lazy-img">
  <picture>
    <source srcset={src} type="image/webp" />
    <img {src} {alt} loading="lazy" class="img-fluid" />
  </picture>
</div>

<style type="scss">
  @use 'sass:math';
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  .lazy-img {
    // https://en.wikipedia.org/wiki/Paper_size
    $paper-aspect-ratio: math.div(1, math.sqrt(2));
    aspect-ratio: $paper-aspect-ratio;
    background-color: $independence-lighter;
    border: 1px solid $independence-light;
    height: auto;
    overflow: hidden;
  }
</style>
