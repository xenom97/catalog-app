import { mutationTree, actionTree } from 'typed-vuex';
import { getProducts, getProductsInCategory } from '~/api/product.api';
import { IProduct, ProductCategory } from '~/entities/product.entity';

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
    async getProducts({ commit }, category?: ProductCategory): Promise<void> {
      commit('SET_LOADING', true);

      let data;

      if (category) {
        data = await getProductsInCategory({ $axios: this.$axios, category });
      } else {
        data = await getProducts(this.$axios);
      }

      if (data) {
        commit('SET_PRODUCTS', data);
      }

      commit('SET_LOADING', false);
    },
  }
);
