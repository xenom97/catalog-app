<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Navbar',
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar__content">
      <span class="navbar__title">Product Catalog</span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: $primary-color;
  box-shadow: $default-shadow;
  padding: 1em 0;

  &__content {
    max-width: $breakpoint-lg;
    margin: 0 auto;
  }

  &__title {
    text-transform: uppercase;
    color: $light-orange-color;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
