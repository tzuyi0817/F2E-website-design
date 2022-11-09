<script setup lang="ts">
import { ref, onMounted } from 'vue';
import JoinBtn from '@/components/JoinBtn.vue';
import { gsap } from '@/utils/gsap';

const characters = ref<HTMLDivElement | null>(null);

async function setCharactersGsap() {
  const options = {
    start: 'top 100%',
    end: 'top 1%',
    scrub: true,
  };

  const questionsTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_questions',
      ...options,
    },
  });

  const applyTimeLine = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_apply',
      ...options,
    },
  });

  questionsTimeLine
    .to(characters.value, { scale: 0.5 })
    .to('.f2e_traffic', { opacity: 0 }, '<')
    .to('.f2e_characters_join', { opacity: 1, visibility: 'visible' }, '<');

  applyTimeLine
    .to(characters.value, { scale: 1 })
    .to('.f2e_traffic', { opacity: 1 }, '<')
    .to('.f2e_characters_join', { opacity: 0, visibility: 'hidden' }, '<');
}

onMounted(setCharactersGsap);
</script>

<template>
  <div class="f2e_characters" ref="characters">
    <div class="flex">
      <img class="w-[15vh]" src="@/assets/character/character_f2e.gif" alt="" />
      <img class="w-[16vh]" src="@/assets/character/character_ui.gif" alt="" />
      <img class="w-[15vh]" src="@/assets/character/character_team.gif" alt="" />
    </div>
    <img class="f2e_characters_road" src="@/assets/main/road.png" alt="" />
  </div>

  <join-btn class="f2e_characters_join" :isShowJoin="true" />
</template>

<style lang="postcss" scoped>
.f2e_characters {
  @apply fixed bottom-0 origin-bottom;
  &_road {
    @apply absolute w-full bottom-0 -z-[1]
  }
  &_join {
    @apply fixed bottom-5 w-10 right-5 invisible opacity-0;
  }
}
</style>