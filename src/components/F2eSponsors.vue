<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import { gsap, gsapMap, swipeUp, removeTrigger, killTrigger } from '@/utils/gsap';

const sponsors = ref<HTMLUListElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

async function setSponsorGsap(className: string) {
  if (!isMobile.value) return;
  if (!sponsors.value) {
    await nextTick();
    setSponsorGsap(className);
    return;
  }
  const element = sponsors.value.getElementsByClassName(className)[0];
  const memoAnimate = gsapMap.get(`sponsors_mobile`) ?? {};
  const trigger = swipeUp(element);

  gsapMap.set('sponsors_mobile', { ...memoAnimate, [className]: trigger });
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_sponsors',
      pin: true,
      end: 'bottom 0%',
      scrub: true,
    },
  });

  removeTrigger('sponsors_mobile');
  reset();
  gsapMap.set('sponsors_desktop', trigger);
  trigger
    .to({}, { duration: 5 })
    .to('.f2e_sponsors_title', { autoAlpha: 1, duration: 5 })
    .to('.f2e_sponsors_tree.left', { xPercent: 80, yPercent: 90, autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_sponsors_tree.right', { xPercent: -80, yPercent: 90, autoAlpha: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.blockStudio', { autoAlpha: 1, yPercent: 0, duration: 5 })
    .to('.f2e_sponsors_tree.left', { xPercent: 120, scale: 1, duration: 5 }, '<')
    .to('.f2e_sponsors_tree.right', { xPercent: -120, scale: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.titanSoft', { autoAlpha: 1, yPercent: 0, duration: 5 })
    .to('.f2e_sponsors_tree.left', { xPercent: 160, scale: 0.8, duration: 5 }, '<')
    .to('.f2e_sponsors_tree.right', { xPercent: -160, scale: 0.8, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.kdanMobile', { autoAlpha: 1, yPercent: 0, duration: 5 })
    .to('.f2e_sponsors_tree.left', { xPercent: 200, yPercent: 100, scale: 0.6, duration: 5 }, '<')
    .to('.f2e_sponsors_tree.right', { xPercent: -200, yPercent: 100, scale: 0.6, duration: 5 }, '<')

    .to({}, { duration: 5 })
    .to('.f2e_sponsors', { autoAlpha: 0, duration: 5 });
}

function reset() {
  const autoAlpha = isMobile.value ? 1 : 0;
  const yPercent = isMobile.value ? 0 : 20;

  gsap.set('.blockStudio', { autoAlpha, yPercent });
  gsap.set('.titanSoft', { autoAlpha, yPercent });
  gsap.set('.kdanMobile', { autoAlpha, yPercent });
  gsap.set('.f2e_sponsors', { autoAlpha: 1 });
  gsap.set('.f2e_sponsors_tree.left', { xPercent: 0, yPercent: 150, autoAlpha: 0, scale: 1.2 });
  gsap.set('.f2e_sponsors_tree.right', { xPercent: 0, yPercent: 150, autoAlpha: 0, scale: 1.2 });
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('sponsors_desktop');
    reset();
    setSponsorGsap('blockStudio');
    setSponsorGsap('titanSoft');
    setSponsorGsap('kdanMobile');
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="f2e_sponsors">
    <title-frame content="贊助單位" class="f2e_sponsors_title" />

    <ul class="flex flex-col  justify-center pt-28 md:gap-[13vh] md:pt-5 md:flex-row" ref="sponsors">
      <li class="f2e_sponsors_sponsor blockStudio">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_blockstudio.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('blockStudio')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#板塊設計</h4>
      </li>
      <li class="f2e_sponsors_sponsor titanSoft">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_titansoft.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('titanSoft')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#鈦坦科技</h4>
      </li>
      <li class="f2e_sponsors_sponsor kdanMobile">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_kdanmobile.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('kdanMobile')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#凱細科技</h4>
      </li>
    </ul>

    <img
      class="f2e_sponsors_tree left"
      src="@/assets/bg/bg_decorate_04.png"
      alt=""
    />
    <img
      class="f2e_sponsors_tree right"
      src="@/assets/bg/bg_decorate_08.png"
      alt=""
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_sponsors {
  @apply w-full relative min-h-[1500px] md:overflow-hidden md:min-h-[300vh];
  &_sponsor {
    @apply flex flex-col gap-4 items-center justify-center mb-11;
  }
  &_btn {
    @apply relative;
    &:active {
      .f2e_sponsors_frame {
        @apply content-[url(@/assets/btn/btn_sponsor_h.png)];
      }
    }
  }
  &_image {
    @apply absolute top-1/2 left-[calc(50%-3px)] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-70px)];
  }
  &_frame {
    @apply min-w-[66.6%] max-w-[260px] min-h-[66.6%] max-h-[260px];
  }
  &_name {
    @apply text-secondary-dark border-secondary-dark border-2;
  }
  &_tree {
    @apply absolute top-0 hidden -z-[1] md:block;
    &.left {
      @apply left-0 max-w-[331px];
    }
    &.right {
      @apply right-0 max-w-[342px];
    }
  }
}
</style>