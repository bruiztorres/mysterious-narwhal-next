<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<div class="lazy-img">
  <img {src} {alt} loading="lazy" class="img-fluid" />
</div>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  .lazy-img {
    background-color: $independence-lighter;
    border: 1px solid $independence-light;

    height: auto;
    aspect-ratio: 3 / 4;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
