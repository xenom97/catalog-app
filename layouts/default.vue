<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import CategoryList from '~/components/CategoryList.vue';

export default defineComponent({
  name: 'LayoutDefault',

  components: { CategoryList },
});
</script>

<template>
  <div id="layout-default">
    <CategoryList />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss" scoped>
#layout-default {
  display: flex;
  width: 100%;
  max-width: $container-max-width;
  margin: 0 auto;
  margin-top: 32px;
}

main {
  flex: 1;
}
</style>
