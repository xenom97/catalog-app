<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'Navbar',

  setup() {
    const { $accessor } = useContext();

    function toggleMenu() {
      const { showMenu, SET_SHOW_MENU } = $accessor.core;
      SET_SHOW_MENU(!showMenu);
    }

    return { toggleMenu };
  },
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar__content">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="navbar__toggle"
        @click="toggleMenu"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.25 5.5C4.55964 5.5 4 6.05964 4 6.75C4 7.44036 4.55964 8 5.25 8H18.75C19.4404 8 20 7.44036 20 6.75C20 6.05964 19.4404 5.5 18.75 5.5H5.25ZM4 11.75C4 11.0596 4.55964 10.5 5.25 10.5H18.75C19.4404 10.5 20 11.0596 20 11.75C20 12.4404 19.4404 13 18.75 13H5.25C4.55964 13 4 12.4404 4 11.75ZM4 16.75C4 16.0596 4.55964 15.5 5.25 15.5H18.75C19.4404 15.5 20 16.0596 20 16.75C20 17.4404 19.4404 18 18.75 18H5.25C4.55964 18 4 17.4404 4 16.75Z"
          fill="#F1F6FA"
        />
      </svg>

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
  transition: 0.3s;

  &__content {
    display: flex;
    align-items: center;
    max-width: $breakpoint-lg;
    margin: 0 auto;
  }

  &__title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    color: $light-orange-color;
  }

  &__toggle {
    margin-right: 8px;

    &:hover {
      cursor: pointer;
    }

    @media screen and (min-width: $breakpoint-sm) {
      display: none;
    }
  }

  @media screen and (max-width: $breakpoint-lg) {
    padding: 1em;
  }
}
</style>
