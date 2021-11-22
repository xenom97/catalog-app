<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ProductImageSlider',

  props: {
    images: {
      type: Array as PropType<{ src: string; alt: string }[]>,
      default: () => [],
    },
  },

  setup() {
    const refSwiperTop = ref();
    const refSwiperThumbs = ref();

    const swiperOptionTop = ref({
      loop: true,
      loopedSlides: 5, // looped slides should be the same
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    const swiperOptionThumbs = ref({
      loop: true,
      loopedSlides: 5, // looped slides should be the same
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });

    onMounted(() => {
      nextTick(() => {
        nextTick(() => {
          const swiperTop = refSwiperTop.value.$swiper;
          const swiperThumbs = refSwiperThumbs.value.$swiper;
          refSwiperTop.value.$swiper.controller.control = swiperThumbs;
          refSwiperThumbs.value.$swiper.controller.control = swiperTop;
        });
      });
    });

    return {
      refSwiperTop,
      refSwiperThumbs,
      swiperOptionTop,
      swiperOptionThumbs,
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <client-only>
      <Swiper
        ref="refSwiperTop"
        :options="swiperOptionTop"
        class="swiper gallery-top"
      >
        <SwiperSlide v-for="(img, idx) in images" :key="idx">
          <img :src="img.src" :alt="img.alt" />
        </SwiperSlide>
        <div
          slot="button-next"
          class="swiper-button-next swiper-button-white"
        />
        <div
          slot="button-prev"
          class="swiper-button-prev swiper-button-white"
        />
      </Swiper>

      <Swiper
        ref="refSwiperThumbs"
        :options="swiperOptionThumbs"
        class="swiper gallery-thumbs"
      >
        >
        <SwiperSlide v-for="(img, idx) in images" :key="idx">
          <img :src="img.src" :alt="img.alt" />
        </SwiperSlide>
      </Swiper>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 320px;
  width: 380px;
  background: #212121;
  border: 1px solid #efefef;
}
.swiper {
  &.gallery-top {
    height: 80%;
    width: 100%;

    .swiper-slide {
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 0.5em 0;

    .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.3;

      &-active {
        opacity: 1;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-container {
    .swiper-button-next,
    .swiper-button-prev {
      opacity: 0;
      transition: 0.3s;
      padding: 0.5em;
      box-shadow: $default-shadow;
    }
    &:hover {
      .swiper-button-next,
      .swiper-button-prev {
        opacity: 0.8;
        background: #212121;
        border-radius: 0.25em;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .wrapper {
    width: 100%;

    .gallery-top {
      height: 100%;
    }

    .gallery-thumbs {
      display: none;
    }
  }
}
</style>
