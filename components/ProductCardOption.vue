<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ProductCardOption',

  setup() {
    const selectedVariant = ref<string>('');
    const selectedSize = ref<string>('');
    const qty = ref<number>(1);

    function handleQty(type: 'add' | 'subtract') {
      if (type === 'add') {
        qty.value++;
      } else if (qty.value > 1) {
        qty.value--;
      }
    }

    return {
      selectedVariant,
      selectedSize,

      qty,
      handleQty,
    };
  },
});
</script>

<template>
  <div class="product__option">
    <h4>Variant</h4>
    <div class="chip">
      <span
        v-for="variant in 5"
        :key="variant"
        :class="[
          'chip__item',
          { 'chip__item--active': selectedVariant === variant },
        ]"
        @click="selectedVariant = variant"
      >
        Variant {{ variant }}
      </span>
    </div>

    <h4>Size</h4>
    <div class="chip">
      <span
        v-for="size in ['small', 'medium', 'large']"
        :key="size"
        :class="['chip__item', { 'chip__item--active': selectedSize === size }]"
        @click="selectedSize = size"
      >
        {{ size }}
      </span>
    </div>

    <hr />

    <div class="product__cart">
      <div class="cart__qty">
        <button @click="handleQty('subtract')">-</button>
        <span>{{ qty }}</span>
        <button @click="handleQty('add')">+</button>
      </div>

      <button
        class="cart__action"
        :disabled="!selectedVariant || !selectedSize"
      >
        <span>Add to cart</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  &__option {
    max-width: 280px;
    width: 100%;
    margin-left: 16px;

    @media screen and (max-width: $breakpoint-md) {
      margin-top: 2em;
      margin-left: 0;
      max-width: none;
    }
  }

  &__cart {
    display: flex;

    .cart__action {
      margin-left: 0.5em;
      background: $secondary-color;
      border: none;
      width: 100%;
      border-radius: 1em;

      &:hover {
        cursor: pointer;
      }

      span {
        color: $light-orange-color;
        text-transform: uppercase;
        font-weight: bold;
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    .cart__qty {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 1em;

      span {
        min-width: 1em;
        text-align: center;
      }

      button {
        border: none;
        background: transparent;
        color: #ccc;
        font-size: 20px;
        padding: 0.35em 0.65em;

        &:hover {
          cursor: pointer;
          color: black;
        }
      }
    }
  }
}

.chip {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5em;

  &__item {
    padding: 0.5em;
    border-radius: 1em;
    border: 1px solid #ddd;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    font-size: 14px;
    text-transform: capitalize;

    &:hover:not(.chip__item--active) {
      cursor: pointer;
      border-color: rgb(204, 88, 35);
      color: rgb(204, 88, 35);
    }

    &--active {
      border-color: $secondary-color;
      background: $secondary-color;
      color: $light-orange-color;
    }
  }
}
</style>
