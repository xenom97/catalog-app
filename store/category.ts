import { mutationTree, actionTree } from 'typed-vuex';
import { getCategories } from '~/api/product.api';
import { ProductCategory } from '~/entities/product.entity';

export const state = () => ({
  isLoading: false as boolean,
  categories: [] as ProductCategory[],
  selectedCategory: '' as ProductCategory,
});

export const mutations = mutationTree(state, {
  SET_LOADING(state, loading: boolean) {
    state.isLoading = loading;
  },
  SET_CATEGORIES(state, categories: ProductCategory[]) {
    state.categories = categories;
  },
  SET_SELECTED_CATEGORY(state, category: ProductCategory) {
    state.selectedCategory = category;
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    async getCategories({ commit }): Promise<void> {
      commit('SET_LOADING', true);

      const data = await getCategories(this.$axios);

      if (data) {
        commit('SET_CATEGORIES', data);
      }

      commit('SET_LOADING', false);
    },
  }
);
