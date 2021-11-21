<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ProductDetailLoading',
});
</script>

<template>
  <section>
    <div class="image-loading__container">
      <div class="image-loading__top skeleton"></div>
      <div class="image-loading__bottom skeleton"></div>
    </div>

    <div class="detail-loading__container">
      <div v-for="i in 4" :key="i" class="detail-loading__item skeleton" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.image-loading {
  &__container {
    height: 320px;
    width: 380px;
    border: 2px solid #ebebeb;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__top {
    height: 80%;
  }

  &__bottom {
    margin: auto;
    width: 95%;
    height: 15%;
  }
}

.detail-loading {
  &__container {
    flex: 1;
    padding: 0 1.5em 1.5em 1.5em;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__item {
    height: 20%;
  }
}
</style>
