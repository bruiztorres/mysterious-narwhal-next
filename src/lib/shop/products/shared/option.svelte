<script lang="ts">
  export let name: string;
  export let value: string;
  export let group: string;
  export let style: string | null = null;

  const id = `${name}-${value}`;
</script>

<div class="option">
  <input {id} {name} {value} bind:group type="radio" class="btn-check" autocomplete="off" />
  <label class="btn rounded-circle" for={id} {style}>
    <slot />
  </label>
</div>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  $product-option-size: 3rem;
  $product-option-margin: 0.25rem;

  .option {
    display: inline-block;
    position: relative;
    margin: 0 $product-option-margin;

    input:focus + label,
    input:checked + label {
      box-shadow: 0 0 0 $product-option-margin $rust-200;
    }

    label {
      background-color: $rust-100;
      border-color: $rust-200;
      height: $product-option-size;
      width: $product-option-size;
      line-height: 1.6;
    }
  }
</style>
