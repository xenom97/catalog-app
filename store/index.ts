import { getAccessorType } from 'typed-vuex';

import * as category from './category';
import * as product from './product';

export const accessorType = getAccessorType({
  modules: {
    category,
    product,
  },
});

export type TypeAccessor = typeof accessorType;
