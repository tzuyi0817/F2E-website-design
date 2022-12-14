<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import { gsap, gsapMap, swipeUp, killTrigger } from '@/utils/gsap';

const contest = ref<HTMLDivElement | null>(null);
const awardLight = ref<HTMLImageElement | null>(null);
const contestContent = ref<HTMLTableSectionElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

function setContestGsap() {
  isMobile.value ? setMobileGsap() : setDesktopGsap();
}

function setMobileGsap() {
  killTrigger('contest_desktop');
  reset();
  const trigger = swipeUp(contestContent.value);
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: contest.value,
      start: 'top 100%',
      end: 'top -100%',
      scrub: true,
    },
  });

  gsapMap.set('contest_mobile', { awardLight: timeLine, contestContent: trigger });
  timeLine.to(awardLight.value, { rotate: -720 });
}

function setDesktopGsap() {
  const memoAnimate = gsapMap.get('contest_mobile');
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: contest.value,
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  memoAnimate?.contestContent?.disable(true);
  memoAnimate?.awardLight?.scrollTrigger?.kill(true);
  reset();
  gsapMap.set('contest_desktop', trigger);
  trigger
    .to({}, { duration: 5 })
    .to('.f2e_contest_title', { autoAlpha: 1, duration: 2 })

    .to({}, { duration: 2 })
    .to('.f2e_contest_content', { xPercent: 0, autoAlpha: 1, duration: 5 })
    .to(awardLight.value, { rotate: -360, duration: 5 }, '<')

    .to({}, { duration: 5 })
    .to('.f2e_contest_title', { autoAlpha: 0, duration: 5 })
    .to('.f2e_contest_content', { xPercent: 30, autoAlpha: 0, duration: 5 }, '<')
    .to(awardLight.value, { rotate: -720, duration: 5 }, '<');
}

function reset() {
  gsap.set(awardLight.value, { rotate: 0 });
  gsap.set(contest.value, { autoAlpha: 1 });
  gsap.set(contestContent.value, { autoAlpha: 1 });
  gsap.set('.f2e_contest_content', { 
    autoAlpha: isMobile.value ? 1 : 0,
    xPercent: isMobile.value ? 0 : -20,
  });
}

watch(isMobile, setContestGsap);
onMounted(setContestGsap);
</script>

<template>
  <div class="f2e_contest" ref="contest">
    <title-frame content="?????????????????????!" class="f2e_contest_title" />

    <div class="f2e_contest_content">
      <div class="flex flex-col md:flex-row items-center relative h-[375px]">
        <img
          ref="awardLight"
          src="@/assets/main/award_light.png"
          class="f2e_contest_award absolute -z-[1]"
          alt=""
        />
        <img src="@/assets/main/award_trophy.png" class="f2e_contest_award" alt="" />
      </div>

      <section class="px-5 pt-36 md:pt-0" ref="contestContent">
        <p class="f2e_contest_theme">????????????</p>
        <p class="f2e_contest_text">??????: ???????????????????????????UI ??????????????????????????????</p>
        <p class="f2e_contest_text">??????: ????????????????????????????????????,??????????????????,?????? 12/30(???) ?????????????????????????????????!</p>
        <p class="f2e_contest_theme">??????</p>
        <p class="f2e_contest_text">1. ???????????? ???????????? ????????????</p>
        <p class="f2e_contest_text">2. ??????????????? ????????? NTD <span class="f2e_contest_bonus">3,000</span> /???</p>
        <p class="f2e_contest_text">3. ??????????????? ????????? NTD <span class="f2e_contest_bonus">10,000</span> /???</p>
        <p class="f2e_contest_text">4. ?????????????????????????????????</p>
      </section>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_contest {
  @apply
  pt-20 
  flex
  flex-col
  items-center
  overflow-hidden
  w-full
  min-h-[1120px]
  md:pt-0
  md:min-h-[300vh];
  &_content {
    @apply flex flex-col md:flex-row;
  }
  &_award {
    @apply w-[90%] max-w-[375px];
  }
  &_theme {
    @apply text-[32px] text-highlight py-6;
  }
  &_text {
    @apply text-lg text-primary;
  }
  &_bonus {
    @apply text-highlight text-2xl;
  }
}
</style>