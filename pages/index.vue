<script lang="ts">
import {
  computed,
  defineComponent,
  useContext,
  watch,
} from '@nuxtjs/composition-api';

// Components
import ProductCard from '~/components/ProductCard.vue';
import ProductCardLoading from '~/components/ProductCardLoading.vue';
import CategoryList from '~/components/CategoryList.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    CategoryList,
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
    <CategoryList />

    <div class="product-container">
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
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  max-width: $container-max-width;
  margin: 16px auto;
}

.product-container {
  flex: 1;
  display: grid;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 1em;
  margin-left: 280px;
}
</style>
