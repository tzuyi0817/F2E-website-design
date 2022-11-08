<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { swipeUp } from '@/utils/gsap';

interface Props {
  content: string;
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
});
const title = ref<HTMLDivElement | null>(null);

function setTitleGsap() {
  swipeUp(title.value);
}

onMounted(setTitleGsap);
</script>

<template>
  <div class="title_frame" ref="title">
    <div class="relative">
      <img src="@/assets/bg/bg_talking_c.png" alt="" />
      <h2>{{ content }}</h2>
    </div>
    <h3 class="text-secondary-dark text-center" v-html="description"></h3>
  </div>
</template>

<style lang="postcss" scoped>
.title_frame {
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
}
</style>

