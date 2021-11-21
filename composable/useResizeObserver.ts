import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  Ref,
  ref,
} from '@nuxtjs/composition-api';

export function useResizeObserver(): {
  windowWidth: Ref<number>;
  isMobileScreen: ComputedRef<boolean>;
} {
  const windowWidth = ref<number>(0);

  const isMobileScreen = computed(() => windowWidth.value < 768);

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

  return { windowWidth, isMobileScreen };
}
