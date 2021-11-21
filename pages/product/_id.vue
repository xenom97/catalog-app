<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import { getProductById } from '~/api/product.api';
import { getSamplePhotos } from '~/api/unsplash.api';
import { IProduct } from '~/entities/product.entity';

// Components
import ProductImageSlider from '~/components/ProductImageSlider.vue';
import ProductCardOption from '~/components/ProductCardOption.vue';
import ProductDetailLoading from '~/components/ProductDetailLoading.vue';
import ProductDetailRelated from '~/components/ProductDetailRelated.vue';

export default defineComponent({
  name: 'ProductDetailPage',

  components: {
    ProductImageSlider,
    ProductCardOption,
    ProductDetailLoading,
    ProductDetailRelated,
  },

  setup() {
    const { $axios, params, $config } = useContext();

    const isFetchingProductDetail = ref<boolean>(true);
    const product = ref<IProduct>({} as IProduct);

    async function getProductDetail() {
      try {
        const data = await getProductById($axios, params.value.id);

        if (data) {
          product.value = data;
        }
      } catch (error) {
      } finally {
        isFetchingProductDetail.value = false;
      }
    }

    const productImages = ref<{ src: string; alt: string }[]>([]);
    const isFetchingSamplePhotos = ref<boolean>(true);

    async function getSamplePhotosFromUnsplash() {
      try {
        const data = await getSamplePhotos({
          $axios,
          accessKey: $config.unsplashAccessKey,
          category: product.value.category,
        });

        if (data && data.photos.results.length > 0) {
          const sampleImages = data.photos.results.map((img) => ({
            src: img.urls.regular,
            alt: img.alt_description,
          }));

          const originalImages = {
            src: product.value.image,
            alt: product.value.title,
          };

          productImages.value = [originalImages, ...sampleImages];
        }
      } catch (error) {
      } finally {
        isFetchingSamplePhotos.value = false;
      }
    }

    onMounted(async () => {
      await getProductDetail();
      getSamplePhotosFromUnsplash();
    });

    return {
      product,
      productImages,
      isFetchingProductDetail,
      isFetchingSamplePhotos,
    };
  },
});
</script>

<template>
  <div class="container">
    <ProductDetailLoading
      v-if="isFetchingProductDetail || isFetchingSamplePhotos"
    />

    <section v-else class="product-section">
      <ProductImageSlider :images="productImages" />

      <div class="product__detail">
        <div class="product__detail--left">
          <h3 class="product__title">{{ product.title }}</h3>

          <div v-if="product.rating" class="product__rating">
            <StarRating
              v-model="product.rating.rate"
              read-only
              :star-size="20"
              :fixed-points="1"
              :round-start-rating="false"
              :show-rating="false"
            />
            <b>({{ product.rating.rate }})</b>

            <span class="product__rating-review">
              Customer Reviews <b>({{ product.rating.count }})</b>
            </span>
          </div>

          <p class="product__price">Price: ${{ product.price }}</p>

          <p class="product__brand"><b>Brand:</b> Product Brand</p>

          <p class="product__category">
            <b>Category:</b> {{ product.category }}
          </p>

          <p class="product__description">
            <b>Description:</b> {{ product.description }}
          </p>
        </div>
        <ProductCardOption />
      </div>
    </section>

    <ProductDetailRelated
      :category="product.category || ''"
      :is-ready="!!product.category"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  flex-direction: column;
}

section {
  display: flex;
  padding: 1.5em;
  box-shadow: $default-shadow;

  &.product-section {
    @media screen and (max-width: $breakpoint-sm) {
      flex-direction: column;
    }
  }
}

.product {
  &__detail {
    flex: 1;
    display: flex;
    padding: 0 1.5em 1.5em 1.5em;

    &--left {
      flex: 1;
    }

    @media screen and (max-width: $breakpoint-md) {
      flex-direction: column;
      margin-top: 1.5em;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    margin-top: 0.5em;

    &-review {
      margin-left: 1em;
    }
  }

  &__price {
    color: $secondary-color;
    font-weight: bold;
    font-size: 24px;
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  &__brand,
  &__category,
  &__description {
    font-size: 1em;
    margin-top: 0.5em;
  }
}
</style>
