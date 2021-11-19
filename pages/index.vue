<template>
  <div class="container">
    <div v-for="(product, idx) in products" :key="idx" class="card">
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
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  watch,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const { $accessor } = useContext();

    const products = computed(() => $accessor.product.products);
    const selectedCategory = computed(
      () => $accessor.category.selectedCategory
    );

    watch(selectedCategory, (_category) => {
      $accessor.product.getProducts(_category);
    });

    // Initial Fetching
    Promise.all([
      $accessor.category.getCategories(),
      $accessor.product.getProducts(),
    ]);

    return {
      products,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 1em;
}

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
