<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'ProductCardLoading',
});
</script>

<template>
  <div class="card-loading__container">
    <div class="card-loading__image skeleton"></div>
    <div class="card-loading__body">
      <div class="card-loading__text skeleton"></div>
      <div class="card-loading__text skeleton"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-loading {
  &__container {
    overflow: auto;
    border-radius: 0.75em;
    min-width: 200px;
    width: 100%;
    height: 280px;
    background: white;
    border: 2px solid #ebebeb;
  }

  &__image {
    height: 150px;
  }

  &__body {
    padding: 1em;
  }

  &__text {
    margin-top: 1em;
    height: 24px;
  }
}
</style>
