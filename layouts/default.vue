<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Navbar from '~/components/Navbar.vue';

export default defineComponent({
  name: 'LayoutDefault',

  components: {
    Navbar,
  },
});
</script>

<template>
  <div id="layout-default">
    <Navbar />

    <main>
      <Nuxt />
    </main>
  </div>
</template>
