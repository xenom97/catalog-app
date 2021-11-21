<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api';
import { getProductsInCategory } from '~/api/product.api';
import { IProduct, ProductCategory } from '~/entities/product.entity';

// Components
import ProductCard from './ProductCard.vue';
import ProductCardLoading from '~/components/ProductCardLoading.vue';

export default defineComponent({
  name: 'ProductDetailRelated',

  components: {
    ProductCard,
    ProductCardLoading,
  },

  props: {
    category: {
      type: [String] as PropType<ProductCategory>,
      required: true,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { $axios, redirect } = useContext();

    const products = ref<IProduct[]>([]);
    const isLoading = ref(true);

    async function getProductById() {
      const data = await getProductsInCategory({
        $axios,
        category: props.category!,
      });

      if (data) {
        products.value = data;
      }

      isLoading.value = false;
    }

    watch(
      () => props.isReady,
      (isReady) => {
        if (isReady) {
          getProductById();
        }
      }
    );

    function goToProductDetail(id: number) {
      redirect(`/product/${id}`);
    }

    return { products, isLoading, goToProductDetail };
  },
});
</script>

<template>
  <section>
    <h3>Related Products</h3>

    <div class="product-container">
      <template v-if="isLoading">
        <ProductCardLoading v-for="card in 5" :key="card" />
      </template>

      <template v-else>
        <ProductCard
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
          @click="goToProductDetail(product.id)"
        />
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 1em;
  flex-direction: column;
}

.product-container {
  flex: 1;
  display: grid;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  transition: 0.3s;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-top: 1.5em;

  @media screen and (max-width: $breakpoint-sm) {
    margin-left: 0;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
