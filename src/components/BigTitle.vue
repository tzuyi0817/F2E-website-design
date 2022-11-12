<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import { gsap, gsapMap, killTrigger } from '@/utils/gsap';

const bigTitle = ref<HTMLDivElement | null>(null);
const title = ref<HTMLElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

async function setBigTitleGsap() {
  reset();
  isMobile.value ? setMobileGsap() : setDesktopGsap()
}

function setMobileGsap() {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: title.value,
      start: 'top 100%',
      end: 'top 1%',
      scrub: true,
    },
  });

  killTrigger('bigTitle_desktop');
  gsapMap.set('bigTitle_mobile', timeLine);
  timeLine.to(title.value, { scale: 1, opacity: 1 });
}

function setDesktopGsap() {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: bigTitle.value,
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  killTrigger('bigTitle_mobile');
  gsapMap.set('bigTitle_desktop', timeLine);
  timeLine
    .to({}, { duration: 5 })
    .to('.bigTitle_cloud', { xPercent: -25, duration: 5, autoAlpha: 1 })
    .to('.bigTitle_pig', { xPercent: 25, duration: 5, autoAlpha: 1 }, '<')

    .to(title.value, { scale: 1, opacity: 1, duration: 5 })
    .to('.bigTitle_cloud', { xPercent: 50, yPercent: 150, duration: 5, autoAlpha: 1 }, '<')
    .to('.bigTitle_pig', { xPercent: -50, yPercent: 70, duration: 5, autoAlpha: 1 }, '<')

    .to({}, { duration: 10 })
    .to(bigTitle.value, { autoAlpha: 0, duration: 5 });
}

function reset() {
  gsap.set(title.value, { yPercent: isMobile.value ? 300 : 500 });
  gsap.set('.bigTitle_cloud', { xPercent: -50, yPercent: 200, autoAlpha: 0 });
  gsap.set('.bigTitle_pig', { xPercent: 50, yPercent: 100, autoAlpha: 0 });
  gsap.set(bigTitle.value, { autoAlpha: 1 });
}

watch(isMobile, setBigTitleGsap);
onMounted(setBigTitleGsap);
</script>

<template>
  <div class="bigTitle" ref="bigTitle">
    <h1 ref="title">區區修練<br class="md:hidden" />已經無法滿足了嗎?</h1>
    <img
      class="bigTitle_cloud"
      src="@/assets/bg/bg_decorate_03.png"
      alt=""
    />
    <img
      class="bigTitle_pig"
      src="@/assets/bg/bg_decorate_07.png"
      alt=""
    />
  </div>
</template>

<style lang="postcss" scoped>
.bigTitle {
  @apply w-full relative overflow-hidden h-[100vh] md:min-h-[300vh];
  h1 {
    @apply
    text-highlight
    text-center
    leading-9
    scale-[200%]
    opacity-0;
  }
  img {
    @apply absolute top-0 w-[50%] -z-[1] hidden md:block;
  }
  &_cloud {
    @apply left-0 max-w-[368px];
  }
  &_pig {
    @apply right-0 max-w-[450px];
  }
}
</style>
