<script lang="ts">
  import { page } from '$app/stores';
  import BagIcon from '../../../../static/icons/bag.svg';
  //import { cartStore } from '../../shop/cart/store';

  //$: count = $cartStore.cart.quantity;
  $: cartUrl = `${$page.url.pathname}#cart`;

  const count = 0;
</script>

<header class="header">
  <div class="header__container container-xxl">
    <a href="/" class="header__logo">María Jesús Delgado</a>
    <nav class="header__nav">
      <a href={cartUrl} class="header__link">
        <div class="count">
          {#if count > 0}
            <div role="alert" class="count__number">
              <div>{count}</div>
            </div>
          {/if}
          <div class="count__icon">
            <BagIcon />
          </div>
        </div>
      </a>
    </nav>
  </div>
</header>

<style type="scss">
  @import 'bootstrap/scss/functions';
  @import 'bootstrap/scss/variables';
  @import 'src/styles/abstracts/variables';

  $header-height: 4.5rem;

  .header {
    background-color: $white;
    border-bottom: 1px solid $body-bg;

    &__container {
      padding: 0 $spacer;
      display: flex;
      height: $header-height;
      align-items: center;
    }

    &__logo {
      font-size: 0.875rem;
      font-weight: 200;
      line-height: 1.2;
      width: 4rem;
    }

    &__nav {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__link,
    &__logo {
      color: $black;
      text-decoration: none;

      &:hover {
        color: $gray-600;
      }
    }
  }

  $count-size: 1.75rem;

  .count {
    position: relative;

    &__icon,
    &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $count-size;
      width: $count-size;
    }

    &__icon {
      transition: transform 0.5s ease;
    }

    &__number {
      border: 1px solid $black;
      border-radius: 50%;

      & + .count__icon {
        position: absolute;
        top: 0;
        left: 0;
        background: $white;
        border-radius: 50%;
        transform: translate(15px, 12px) scale(0.65);
      }
    }
  }
</style>
