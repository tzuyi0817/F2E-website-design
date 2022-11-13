<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import JoinBtn from '@/components/JoinBtn.vue';
import { gsap, gsapMap, killPinTrigger, createTimeLine } from '@/utils/gsap';

const characters = ref<HTMLDivElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

function setCharactersGsap() {
  isMobile.value ? setMobileAnimate() : setDesktopAnimate();
}

function setMobileAnimate() {
  const questionsTimeLine = createTimeLine('.f2e_questions');
  const applyTimeLine = createTimeLine('.f2e_apply');

  killPinTrigger('characters_desktop');
  reset();
  gsapMap.set('characters_mobile', { questionsTimeLine, applyTimeLine });
  questionsTimeLine
    .to(characters.value, { scale: 0.5 })
    .to('.f2e_traffic', { autoAlpha: 0 }, '<')
    .to('.f2e_characters_join', { autoAlpha: 1 }, '<');

  applyTimeLine
    .to(characters.value, { scale: 1 })
    .to('.f2e_traffic', { autoAlpha: 1 }, '<')
    .to('.f2e_characters_join', { autoAlpha: 0 }, '<');
}

function setDesktopAnimate() {
  const questionsTimeLine = createTimeLine('.f2e_questions');
  const themesTimeLine = createTimeLine('.f2e_theme');
  const stagesTimeLine = createTimeLine('.t2e_stage');
  const schedulesTimeLine = createTimeLine('.f2e_schedule');
  const bigTitleTimeLine = createTimeLine('.bigTitle');
  const contestTimeLine = createTimeLine('.f2e_contest');
  const sponsorsTimeLine = createTimeLine('.f2e_sponsors');

  killPinTrigger('characters_mobile');
  reset();
  gsapMap.set('characters_desktop', {
    questionsTimeLine,
    themesTimeLine,
    stagesTimeLine,
    schedulesTimeLine,
    bigTitleTimeLine,
    contestTimeLine,
    sponsorsTimeLine,
  });

  questionsTimeLine.to(characters.value, { scale: 0.6 });
  themesTimeLine.to(characters.value, { scale: 0.9 });
  stagesTimeLine
    .to(characters.value, { scale: 0.5 })
    .to('.f2e_characters_ui', { scale: 0.7 }, '<');

  schedulesTimeLine
    .to(characters.value, { scale: 0.8 })
    .to('.f2e_characters_ui', { scale: 0.8 }, '<');

  bigTitleTimeLine
    .to(characters.value, { scale: 1 })
    .to('.f2e_characters_ui', { scale: 1 }, '<');
  
  contestTimeLine
    .to(characters.value, { scale: 0.8 })
    .to('.f2e_characters_ui', { scale: 0.75 }, '<');

  sponsorsTimeLine
    .to(characters.value, { scale: 0.85 })
    .to('.f2e_characters_f2e', { scale: 1.1, xPercent: -10 }, '<')
    .to('.f2e_characters_team', { scale: 0.7, yPercent: 15 }, '<');
}

function reset() {
  gsap.set(characters.value, { scale: 1 });
  gsap.set('.f2e_characters_join', { autoAlpha: isMobile.value ? 0 : 1 });
  gsap.set('.f2e_characters_f2e', { scale: 1, xPercent: 0, yPercent: 0, autoAlpha: 1 });
  gsap.set('.f2e_characters_ui', { scale: 1, xPercent: 0, yPercent: 0, autoAlpha: 1 });
  gsap.set('.f2e_characters_team', { scale: 1, xPercent: 0, yPercent: 0, autoAlpha: 1 });
}

watch(isMobile, setCharactersGsap);
onMounted(setCharactersGsap);
</script>

<template>
  <div class="f2e_characters" ref="characters">
    <div class="flex">
      <img class="f2e_characters_f2e" src="@/assets/character/character_f2e.gif" alt="" />
      <img class="f2e_characters_ui" src="@/assets/character/character_ui.gif" alt="" />
      <img class="f2e_characters_team" src="@/assets/character/character_team.gif" alt="" />
    </div>
    <img class="f2e_characters_grass left" src="@/assets/bg/bg_decorate_09.png" alt="" />
    <img class="f2e_characters_grass right" src="@/assets/bg/bg_decorate_09.png" alt="" />
    <img class="f2e_characters_road" src="@/assets/main/road.png" alt="" />

    <img
      class="f2e_characters_finishLine left"
      src="@/assets/main/finishLine_l.png"
      alt=""
    />
    <img
      class="f2e_characters_finishLine right"
      src="@/assets/main/finishLine_r.png"
      alt=""
    />
  </div>

  <join-btn class="f2e_characters_join" :isShowJoin="true" />
</template>

<style lang="postcss" scoped>
.f2e_characters {
  @apply fixed bottom-0 origin-bottom pointer-events-none;
  &_f2e {
    @apply w-[15vh] md:w-[30vh] origin-center;
  }
  &_ui {
    @apply w-[16vh] md:w-[31vh] origin-center;
  }
  &_team {
    @apply w-[15vh] md:w-[30vh] origin-center;
  }
  &_road {
    @apply absolute w-full bottom-0 -z-[1];
  }
  &_grass {
    @apply absolute w-[30vh] -z-[1];
    &.left {
      @apply -left-[25%] rotate-[50%];
    }
    &.right {
      @apply -right-[25%];
    }
  }
  &_join {
    @apply
    fixed
    bottom-5
    w-10
    right-5
    invisible
    opacity-0
    md:w-[103px]
    md:visible
    md:opacity-100;
  }
  &_finishLine {
    @apply absolute top-0 hidden max-w-none w-[65vw] z-[1] md:block;
    &.left {
      @apply top-1/2;
    }
    &.right {
      @apply top-1/2;
    }
  }
}
</style>