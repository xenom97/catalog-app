<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
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

    const windowWidth = ref<number>(0);

    const isShowOverlay = computed(
      () => $accessor.core.showMenu && windowWidth.value < 768
    );

    function closeMenu() {
      $accessor.core.SET_SHOW_MENU(false);
    }

    function onResize(e) {
      windowWidth.value = e.target.innerWidth;
    }

    // Initial Fetching
    Promise.all([
      $accessor.category.getCategories(),
      $accessor.product.getProducts(),
    ]);

    onMounted(() => {
      windowWidth.value = window.innerWidth;
      window.addEventListener('resize', onResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
    });

    return {
      isLoading,
      products,
      isShowOverlay,
      closeMenu,
    };
  },
});
</script>

<template>
  <div class="container">
    <div v-if="isShowOverlay" class="container__overlay" @click="closeMenu" />

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
  max-width: $breakpoint-lg;
  margin: 16px auto;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
  }
}

.product-container {
  flex: 1;
  display: grid;
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-left: 280px;
  transition: 0.3s;
  padding-left: 0.5em;
  padding-right: 0.5em;

  @media screen and (max-width: $breakpoint-sm) {
    margin-left: 0;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
