<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import JoinBtn from '@/components/JoinBtn.vue';
import { gsap, gsapMap, swipeUp, removeTrigger, killTrigger } from '@/utils/gsap';

const apply = ref<HTMLDivElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

function setApplyGsap() {
  if (!isMobile.value) return;
  const trigger = swipeUp(apply.value);

  gsapMap.set('apply_mobile', { apply: trigger });
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: apply.value,
      pin: true,
      end: 'bottom 80%',
      scrub: true,
    },
  });

  removeTrigger('apply_mobile');
  reset();
  gsapMap.set('apply_desktop', trigger);
  trigger
    .to('.f2e_apply_cloud.left', { xPercent: -20, yPercent: 200, autoAlpha: 1, duration: 5 })
    .to('.f2e_apply_cloud.right', { xPercent: 20, yPercent: 200, autoAlpha: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_characters', { scale: 1, duration: 5 })
    .to('.f2e_characters_f2e', { scale: 1, xPercent: 0, duration: 5 }, '<')
    .to('.f2e_characters_ui', { scale: 1, duration: 5 }, '<')
    .to('.f2e_characters_team', { scale: 1, yPercent: 0, duration: 5 }, '<')
    .to('.f2e_apply_finish', { scale: 1, autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.left', { autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.right', { autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_apply_cloud.left', { scale: 0.8, xPercent: 60, yPercent: 150, duration: 5 }, '<')
    .to('.f2e_apply_cloud.right', { scale: 0.8, xPercent: -60, yPercent: 150, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_characters_f2e', { scale: 1.2, xPercent: -10, duration: 5 }, '<')
    .to('.f2e_characters_ui', { scale: 1.2, duration: 5 }, '<')
    .to('.f2e_characters_team', { scale: 1.2, xPercent: 10, duration: 5 }, '<')
    .to('.f2e_apply_cloud.left', { scale: 0.5, xPercent: 100, duration: 5 }, '<')
    .to('.f2e_apply_cloud.right', { scale: 0.5, xPercent: -100, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.left', { rotate: -5, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.right', { rotate: 5, xPercent: 35, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_characters_f2e', { scale: 1.5, xPercent: -40, duration: 5 }, '<')
    .to('.f2e_characters_ui', { scale: 1.5, duration: 5 }, '<')
    .to('.f2e_characters_team', { scale: 1.5, xPercent: 40, duration: 5 }, '<')
    .to('.f2e_apply_cloud.left', { scale: 0.3, xPercent: 120, autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_apply_cloud.right', { scale: 0.2, xPercent: -120, autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.left', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_characters_finishLine.right', { autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_characters_f2e', { scale: 2, xPercent: -80, autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_characters_ui', { scale: 2, autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_characters_team', { scale: 2, xPercent: 80, autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_apply_finish', { autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_apply_logo', { yPercent: 0, autoAlpha: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_apply_join', { yPercent: 0, autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_characters_join', { autoAlpha: 0, duration: 5 }, '<');
}

function reset() {
  const autoAlpha = isMobile.value ? 1 : 0;
  const yPercent = isMobile.value ? 0 : 20;

  gsap.set(apply.value, { autoAlpha: 1 });
  gsap.set('.f2e_apply_logo', { autoAlpha, yPercent });
  gsap.set('.f2e_apply_join', { autoAlpha, yPercent });
  gsap.set('.f2e_apply_cloud.left', { scale: 1, xPercent: -100, yPercent: 300, autoAlpha: 0 });
  gsap.set('.f2e_apply_cloud.right', { scale: 1, xPercent: 100, yPercent: 300, autoAlpha: 0 });
  gsap.set('.f2e_apply_finish', { scale: 2, autoAlpha: 0 });
  gsap.set('.f2e_characters_finishLine.left', { rotate: 0, xPercent: -65, autoAlpha: 0 });
  gsap.set('.f2e_characters_finishLine.right', { rotate: 0, xPercent: 30, autoAlpha: 0 });
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('apply_desktop');
    reset();
    setApplyGsap();
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="f2e_apply" ref="apply">
    <img src="@/assets/logo/logo.png" class="f2e_apply_logo" alt="" @load="setApplyGsap" />
    <join-btn class="f2e_apply_join">
      <h1 class="text-highlight whitespace-nowrap mt-5">立即報名</h1>
    </join-btn>

    <img
      class="f2e_apply_cloud left"
      src="@/assets/bg/bg_decorate_01.png"
      alt=""
    />
    <img
      class="f2e_apply_cloud right"
      src="@/assets/bg/bg_decorate_05.png"
      alt=""
    />
    <img
      class="f2e_apply_finish"
      src="@/assets/main/finish.png"
      alt=""
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_apply {
  @apply flex w-full flex-col items-center gap-10 my-32 relative overflow-hidden md:min-h-[500vh];
  &_logo {
    @apply w-[45vh] max-w-[520px] md:mt-10;
  }
  &_join {
    @apply w-[22%] max-w-[140px];
  }
  &_cloud {
    @apply absolute top-0 hidden -z-[1] md:block;
    &.left {
      @apply left-0 max-w-[430px];
    }
    &.right {
      @apply right-0 max-w-[485px];
    }
  }
  &_finish {
    @apply absolute top-0 hidden w-[120vh] md:block;
  }
}
</style>