<script lang="ts">
  export let ariaLabelledby: string;
</script>

<main aria-labelledby={ariaLabelledby}>
  <slot />
</main>

<style type="scss">
  main {
    flex: 1;
    overflow-y: auto;
  }
</style>
