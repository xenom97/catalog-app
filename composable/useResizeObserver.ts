import { onMounted, onUnmounted, Ref, ref } from '@nuxtjs/composition-api';

export function useResizeObserver(): { windowWidth: Ref<number> } {
  const windowWidth = ref<number>(0);

  function onResize(e) {
    windowWidth.value = e.target.innerWidth;
  }

  onMounted(() => {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return { windowWidth };
}
