<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api';
import { useResizeObserver } from '~/composable/useResizeObserver';

export default defineComponent({
  name: 'Navbar',

  setup() {
    const { $accessor, route, redirect } = useContext();
    const { isMobileScreen } = useResizeObserver();

    const isShowMenu = computed(
      () => isMobileScreen.value && route.value.path === '/'
    );

    function action() {
      if (isShowMenu.value) {
        const { showMenu, SET_SHOW_MENU } = $accessor.core;
        SET_SHOW_MENU(!showMenu);
      } else {
        redirect('/');
      }
    }

    return { isMobileScreen, isShowMenu, action };
  },
});
</script>

<template>
  <nav class="navbar">
    <div class="navbar__content">
      <div class="navbar__action" @click="action">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="navbar__icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="
              isShowMenu
                ? 'M5.25 5.5C4.55964 5.5 4 6.05964 4 6.75C4 7.44036 4.55964 8 5.25 8H18.75C19.4404 8 20 7.44036 20 6.75C20 6.05964 19.4404 5.5 18.75 5.5H5.25ZM4 11.75C4 11.0596 4.55964 10.5 5.25 10.5H18.75C19.4404 10.5 20 11.0596 20 11.75C20 12.4404 19.4404 13 18.75 13H5.25C4.55964 13 4 12.4404 4 11.75ZM4 16.75C4 16.0596 4.55964 15.5 5.25 15.5H18.75C19.4404 15.5 20 16.0596 20 16.75C20 17.4404 19.4404 18 18.75 18H5.25C4.55964 18 4 17.4404 4 16.75Z'
                : 'M16.7526 4.34151C17.1163 4.75715 17.0741 5.38891 16.6585 5.75259L9.51859 12L16.6585 18.2474C17.0741 18.6111 17.1163 19.2429 16.7526 19.6585C16.3889 20.0742 15.7571 20.1163 15.3415 19.7526L7.3415 12.7526C7.12448 12.5627 7 12.2884 7 12C7 11.7117 7.12448 11.4373 7.3415 11.2474L15.3415 4.24744C15.7571 3.88375 16.3889 3.92587 16.7526 4.34151Z'
            "
            fill="#F1F6FA"
          />
        </svg>

        <span class="navbar__title">
          {{
            isMobileScreen && $route.fullPath !== '/'
              ? 'Back'
              : 'Product Catalog'
          }}
        </span>
      </div>
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
    max-width: $breakpoint-lg;
    margin: 0 auto;
  }

  &__action {
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  &__title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 24px;
    color: $light-orange-color;
  }

  &__icon {
    margin-right: 8px;

    @media screen and (min-width: $breakpoint-sm) {
      display: none;
    }
  }

  @media screen and (max-width: $breakpoint-lg) {
    padding: 1em;
  }
}
</style>
