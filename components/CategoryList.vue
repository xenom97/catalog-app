<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api';
import { ProductCategory } from '~/entities/product.entity';

export default defineComponent({
  name: 'CategoryList',

  setup() {
    const { $accessor } = useContext();

    const isLoading = computed<boolean>(() => $accessor.category.isLoading);
    const categories = computed<ProductCategory[]>(
      () => $accessor.category.categories
    );
    const selectedCategory = computed<ProductCategory>(
      () => $accessor.category.selectedCategory
    );

    function setCategory(category: ProductCategory) {
      $accessor.category.SET_SELECTED_CATEGORY(category);
      $accessor.core.SET_SHOW_MENU(false);
    }

    const isShowSidebar = computed(() => $accessor.core.showMenu);

    return {
      isLoading,
      categories,
      selectedCategory,
      setCategory,
      isShowSidebar,
    };
  },
});
</script>

<template>
  <aside :class="['sidebar', { 'sidebar--show': isShowSidebar }]">
    <div v-if="isLoading" class="skeleton__container">
      <div
        v-for="bar in 5"
        :key="bar"
        class="skeleton__bar skeleton"
        :style="{
          marginBottom: bar === 1 ? '24px' : 0,
        }"
      />
    </div>

    <template v-else>
      <h3 class="sidebar__title">Categories</h3>

      <ul class="category">
        <li
          v-for="(category, idx) in categories"
          :key="idx"
          class="category__list"
          :class="{
            'category__list--active': selectedCategory === category,
          }"
          @click="setCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </template>

    <div class="sidebar__footer">
      <span
        v-if="selectedCategory !== ''"
        class="reset"
        @click="setCategory('')"
      >
        Reset Filter
      </span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  width: 280px;
  transition: 0.3s;

  &__title {
    font-weight: bold;
    text-transform: uppercase;
  }

  &__footer {
    margin-top: 1.5em;

    .reset {
      color: $secondary-color;
      padding: 0.25em 0;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: $breakpoint-lg) {
    padding: 0 1em;
  }

  @media screen and (max-width: $breakpoint-sm) {
    left: 0;
    background: #f5f5f5;
    height: 100%;
    margin-top: -1em;
    padding-top: 1em;
    box-shadow: $default-shadow;

    &:not(.sidebar--show) {
      left: -500px;
    }
  }
}

.skeleton {
  &__container {
    padding: 0.5em 0;
    width: 80%;
  }

  &__bar {
    height: 28px;
    border-radius: 8px;
    margin-top: 12px;
    border: 2px solid #ebebeb;
  }
}

.category {
  width: 80%;

  &__list {
    text-transform: capitalize;
    margin-top: 0.5em;
    padding: 0.5em 0;
    transition: 0.3s;
    border-radius: 1em;

    &:first-child {
      margin-top: 1em;
    }

    &:hover {
      box-shadow: $default-shadow;
      padding: 0.5em 1em;

      &:not(.category__list--active) {
        cursor: pointer;
        background: $light-blue-color;
      }
    }

    &--active {
      padding: 0.5em 1em;
      background: $primary-color;
      color: #fff;
    }
  }
}
</style>
