import { mutationTree, actionTree } from 'typed-vuex';
import { getProducts } from '~/api/product.api';
import { IProduct } from '~/entities/product.entity';

export const state = () => ({
  isLoading: false as boolean,
  products: [] as IProduct[],
  selectedProduct: '' as string,
});

export const mutations = mutationTree(state, {
  SET_LOADING(state, loading: boolean) {
    state.isLoading = loading;
  },
  SET_PRODUCTS(state, products: IProduct[]) {
    state.products = products;
  },
  SET_SELECTED_CATEGORY(state, category: string) {
    state.selectedProduct = category;
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    async getProducts({ commit }): Promise<void> {
      commit('SET_LOADING', true);

      const data = await getProducts(this.$axios);

      if (data) {
        commit('SET_PRODUCTS', data);
      }

      commit('SET_LOADING', false);
    },
  }
);
