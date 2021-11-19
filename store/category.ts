import { mutationTree, actionTree } from 'typed-vuex';
import { getCategories } from '~/api/product.api';

export const state = () => ({
  categories: [] as string[],
  selectedCategory: '' as string,
});

export const mutations = mutationTree(state, {
  SET_CATEGORIES(state, categories: string[]) {
    state.categories = categories;
  },
  SET_SELECTED_CATEGORY(state, category: string) {
    state.selectedCategory = category;
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    async getCategories({ commit }): Promise<void> {
      const data = await getCategories(this.$axios);

      if (data) {
        commit('SET_CATEGORIES', data);
      }
    },
  }
);
