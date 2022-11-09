<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from '@/utils/gsap';

const bigTitle = ref<HTMLDivElement | null>(null);
const title = ref<HTMLElement | null>(null);

async function setBigTitleGsap() {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: title.value,
      start: 'top 100%',
      end: 'top 1%',
      scrub: true,
    },
  });

  timeLine.to(title.value, { scale: 1, opacity: 1 });
}

onMounted(setBigTitleGsap);
</script>

<template>
  <div class="bigTitle" ref="bigTitle">
    <h1
      class="text-highlight text-center leading-9 scale-[200%] opacity-0"
      ref="title"
    >
      區區修練<br/>已經無法滿足了嗎?
    </h1>
  </div>
</template>

<style lang="postcss" scoped>
.bigTitle {
  @apply w-full py-56 overflow-hidden;
}
</style>
