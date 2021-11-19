<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'CategoryList',

  setup() {
    const { $accessor } = useContext();

    const isLoading = ref<boolean>(true);
    const categories = computed<string[]>(() => $accessor.category.categories);
    const selectedCategory = computed<string>(
      () => $accessor.category.selectedCategory
    );

    async function fetchCategories() {
      await $accessor.category.getCategories();
      isLoading.value = false;
    }

    fetchCategories();

    function setCategory(category: string) {
      $accessor.category.SET_SELECTED_CATEGORY(category);
    }

    return {
      categories,
      selectedCategory,
      isLoading,
      setCategory,
    };
  },
});
</script>

<template>
  <aside class="sidebar">
    <h2 class="sidebar__title">Categories</h2>

    <div v-if="isLoading" class="skeleton__container">
      <div v-for="bar in 4" :key="bar" class="skeleton__bar skeleton"></div>
    </div>

    <ul v-else class="category">
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

    <div class="sidebar__footer">
      <span
        v-if="selectedCategory !== ''"
        class="reset"
        @click="setCategory('')"
        >Reset Filter</span
      >
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 280px;

  &__title {
    font-weight: bold;
  }

  &__footer {
    margin-top: 1.5em;

    .reset {
      color: $secondary-color;
      padding: 0.25em 0;
      transition: 0.3s;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
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
  }
}

.category {
  width: 80%;

  &__list {
    text-transform: capitalize;
    margin-top: 0.75em;
    padding: 0.5em 0;
    transition: 0.3s;
    border-radius: 1em;

    &:first-child {
      margin-top: 1.5em;
    }

    &:hover {
      box-shadow: 0 2px 10px 0 rgb(20 20 20 / 10%),
        0 2px 10px 0 rgb(20 20 20 / 10%);
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
