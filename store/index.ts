import { getAccessorType } from 'typed-vuex';

import * as core from './core';
import * as category from './category';
import * as product from './product';

export const accessorType = getAccessorType({
  modules: {
    core,
    category,
    product,
  },
});

export type TypeAccessor = typeof accessorType;
