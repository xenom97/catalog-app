<template>
  <div class="container">
    <ProductCard
      v-for="(product, idx) in products"
      :key="idx"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import ProductCard from '~/components/ProductCard.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    ProductCard,
  },

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
</style>
