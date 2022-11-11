<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import { gsap, ScrollTrigger, swipeUp } from '@/utils/gsap';

interface Props {
  content: string;
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
});
const title = ref<HTMLDivElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());
let trigger: ScrollTrigger | undefined = undefined;

function setTitleGsap() {
  reset();
  isMobile.value
    ? trigger = swipeUp(title.value)
    : trigger?.kill(true);
}

function reset() {
  gsap.set(title.value, { autoAlpha: isMobile.value ? 1 : 0, y: 0, });
}

watch(isMobile, setTitleGsap);
onMounted(setTitleGsap);
</script>

<template>
  <div class="title_frame" ref="title">
    <div class="relative flex justify-center">
      <img src="@/assets/bg/bg_talking_l.png" alt="" class="max-w-[100px] hidden md:block" />
      <img src="@/assets/bg/bg_talking_c.png" alt="" class="title_frame_talking" />
      <img src="@/assets/bg/bg_talking_r.png" alt="" class="max-w-[100px] hidden md:block" />
      <h2>{{ content }}</h2>
    </div>
    <h4 class="text-secondary-dark text-center" v-html="description"></h4>
  </div>
</template>

<style lang="postcss" scoped>
.title_frame {
  @apply md:mt-5;
  h2 {
    @apply
    absolute
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-3/4
    w-full
    text-center
    text-primary;
  }
  &_talking {
    @apply
    w-full
    max-w-[540px];
  }
}
</style>

