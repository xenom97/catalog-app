<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { IProduct } from '~/entities/product.entity';

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="card" @click="$emit('click')">
    <div class="card__image">
      <span v-if="!product.image"> Not Available </span>
      <img :src="product.image" :alt="product.title" />
    </div>

    <div class="card__body">
      <p class="product__title">{{ product.title }}</p>
      <p class="product__price">$ {{ product.price }}</p>

      <div v-if="product.rating" class="product__rating">
        <span>⭐{{ product.rating.rate }}</span>
        <span>({{ product.rating.count }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 2px solid #ebebeb;
  border-radius: 0.75em;
  transition: 0.2s;
  background: #fff;

  &:hover {
    cursor: pointer;
    box-shadow: $default-shadow;
  }

  &__image {
    height: 150px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75em 0.75em 0 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__body {
    padding: 0.75em;
  }
}

.product {
  &__title {
    font-size: 12px;
  }

  &__price {
    font-size: 14px;
    color: $secondary-color;
    font-weight: bold;
    padding: 0.5em 0;
  }

  &__rating {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
