import { mutationTree } from 'typed-vuex';

export const state = () => ({
  showMenu: false as boolean,
});

export const mutations = mutationTree(state, {
  SET_SHOW_MENU(state, isShow: boolean) {
    state.showMenu = isShow;
  },
});
