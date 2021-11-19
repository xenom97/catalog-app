import { getAccessorType } from 'typed-vuex';

import * as category from './category';

export const accessorType = getAccessorType({
  modules: {
    category,
  },
});

export type TypeAccessor = typeof accessorType;
