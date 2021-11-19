<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import ProductCard from '~/components/ProductCard.vue';
import ProductCardLoading from '~/components/ProductCardLoading.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    ProductCard,
    ProductCardLoading,
  },

  setup() {
    const { $accessor } = useContext();

    const isLoading = computed<boolean>(() => $accessor.product.isLoading);
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
      isLoading,
      products,
    };
  },
});
</script>

<template>
  <div class="container">
    <template v-if="isLoading">
      <ProductCardLoading v-for="card in 8" :key="card" />
    </template>

    <template v-else>
      <ProductCard
        v-for="(product, idx) in products"
        :key="idx"
        :product="product"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 1em;
}
</style>
