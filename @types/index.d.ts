import { TypeAccessor } from '~/store';

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: TypeAccessor;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: TypeAccessor;
  }

  interface Context {
    $accessor: TypeAccessor;
  }
}
