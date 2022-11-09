<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import { gsap, swipeUp } from '@/utils/gsap';

const contest = ref<HTMLDivElement | null>(null);
const awardLight = ref<HTMLImageElement | null>(null);
const contestContent = ref<HTMLTableSectionElement | null>(null);

function setAwardGsap() {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: contest.value,
      start: 'top 100%',
      end: 'top -100%',
      scrub: true,
    },
  });

  timeLine.to(awardLight.value, { rotate: -720 });
}

onMounted(() => {
  setAwardGsap();
  swipeUp(contestContent.value);
});
</script>

<template>
  <div class="f2e_contest" ref="contest">
    <title-frame content="還有比賽等著你!" />

    <div class="flex flex-col sm:flex-row items-center relative h-[375px]">
      <img
        ref="awardLight"
        src="@/assets/main/award_light.png"
        class="f2e_contest_award absolute -z-[1]"
        alt=""
      />
      <img src="@/assets/main/award_trophy.png" class="f2e_contest_award" alt="" />
    </div>

    <section class="px-5 pt-36" ref="contestContent">
      <p class="f2e_contest_title">評審機制</p>
      <p class="f2e_contest_content">初選: 將由六角學院前端、UI 評審進行第一波篩選。</p>
      <p class="f2e_contest_content">決選: 由六角學院與贊助廠商討論,進行最後篩選,並於 12/30(五) 由評審進行直播公布名單!</p>
      <p class="f2e_contest_title">獎項</p>
      <p class="f2e_contest_content">1. 初選佳作 共六十位 數位獎狀</p>
      <p class="f2e_contest_content">2. 個人企業獎 共六位 NTD <span class="f2e_contest_bonus">3,000</span> /位</p>
      <p class="f2e_contest_content">3. 團體企業獎 共三組 NTD <span class="f2e_contest_bonus">10,000</span> /組</p>
      <p class="f2e_contest_content">4. 以上皆提供完賽數位獎狀</p>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_contest {
  @apply pt-20 flex flex-col items-center overflow-hidden min-h-[1120px];
  &_award {
    @apply w-[90%] max-w-[375px];
  }
  &_title {
    @apply text-[32px] text-highlight py-6;
  }
  &_content {
    @apply text-lg text-primary;
  }
  &_bonus {
    @apply text-highlight text-2xl;
  }
}
</style>