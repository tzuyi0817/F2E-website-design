<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import F2eTraffic from '@/components/F2eTraffic.vue';
import { gsap, gsapMap, killTrigger } from '@/utils/gsap';

const participantDiv = ref<HTMLDivElement | null>(null);
const participantGroup = ref<HTMLUListElement | null>(null);
const participantLogoText = ref<HTMLImageElement | null>(null);
const participantTitle = ref<HTMLElement | null>(null);
const leftCloud = ref<HTMLImageElement | null>(null);
const rightCloud = ref<HTMLImageElement | null>(null);
const start = ref<HTMLImageElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());
const participants = [
  { name: '前端工程師', peoples: 920 },
  { name: 'UI設計師', peoples: 110 },
  { name: '團體組', peoples: 41 },
];

function setParticipantsGsap() {
  killTrigger('participants_desktop');
  reset();
  if (isMobile.value) return;

  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: participantDiv.value,
      pin: true,
      end: 'bottom 80%',
      scrub: true,
    },
  });

  gsapMap.set('participants_desktop', trigger);
  trigger
    .to(leftCloud.value, { scale: 0.66, xPercent: 33, duration: 5 })
    .to(rightCloud.value, { scale: 0.66, xPercent: -33, duration: 5 }, '<')
    .to('.f2e_traffic_ready', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_traffic_yellow', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_traffic_green', { autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to(leftCloud.value, { scale: 0.33, xPercent: 66, duration: 5 })
    .to(rightCloud.value, { scale: 0.33, xPercent: -66, duration: 5  }, '<')
    .to('.f2e_traffic_red', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_traffic_yellow', { autoAlpha: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to(leftCloud.value, { scale: 0, xPercent: 100, duration: 5  })
    .to(rightCloud.value, { scale: 0, xPercent: -100, duration: 5  }, '<')
    .to('.f2e_traffic_yellow', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_traffic_green', { autoAlpha: 1, duration: 5 }, '<')
    .to('.f2e_traffic_go', { autoAlpha: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_traffic', { autoAlpha: 0, duration: 5 })
    .to(participantGroup.value, { autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_header_logo', { autoAlpha: 1, duration: 5 })
    .to(participantTitle.value, { autoAlpha: 0, duration: 5 }, '<')
    .to(participantLogoText.value, { autoAlpha: 0, duration: 5 }, '<')
    .to(start.value, { autoAlpha: 0, duration: 5 }, '<');
}

function reset() {
  gsap.set(leftCloud.value, { scale: 1, xPercent: 0 });
  gsap.set(rightCloud.value, { scale: 1, xPercent: 0 });
  gsap.set('.f2e_traffic_ready', { autoAlpha: 1 });
  gsap.set('.f2e_traffic_red', { autoAlpha: 1 });
  gsap.set('.f2e_traffic_yellow', { autoAlpha: 1 });
  gsap.set('.f2e_traffic_green', { autoAlpha: 1 });
  gsap.set('.f2e_traffic_go', { autoAlpha: 0 });
  gsap.set('.f2e_traffic', { autoAlpha: 1 });
  gsap.set(participantGroup.value, { autoAlpha: 1 });
  gsap.set('.f2e_header_logo', { autoAlpha: 0 });
  gsap.set(participantTitle.value, { autoAlpha: 1 });
  gsap.set(participantLogoText.value, { autoAlpha: 1 });
  gsap.set(start.value, { autoAlpha: 1 });
}

watch(isMobile, setParticipantsGsap);
onMounted(setParticipantsGsap);
</script>

<template>
  <div class="f2e_participants" ref="participantDiv">
    <img src="@/assets/logo/logo.png" alt="" class="f2e_participants_logo" />
    <img src="@/assets/logo/logo_text.png" alt="" class="f2e_participants_logoText" ref="participantLogoText" />
    <h3 class="f2e_participants_title badge" ref="participantTitle">互動式網頁設計</h3>

    <ul class="f2e_participants_group" ref="participantGroup">
      <li v-for="({ name, peoples }, index) in participants" :key="index" class="flex flex-col items-center">
        <h3 class="text-primary text-center mb-2">{{ name }}</h3>
        <h4 class="bg-primary badge text-white flex justify-center items-center gap-1 w-fit">
          <img src="@/assets/icon/ic_users.svg" alt="" class="w-5" />{{ peoples }}
        </h4>
      </li>
    </ul>
    <img
      class="f2e_participants_cloud w-[30vw] md:w-[40vh] -left-6 md:left-[10vw] origin-right"
      src="@/assets/bg/bg_decorate_01.png"
      alt=""
      ref="leftCloud"
    />
    <img
      class="f2e_participants_cloud w-[32vw] md:w-[42vh] -right-6 md:right-[10vw] origin-left"
      src="@/assets/bg/bg_decorate_05.png"
      alt=""
      ref="rightCloud"
    />

    <img class="f2e_start" src="@/assets/main/start.png" alt="" ref="start" />
    <f2e-traffic />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_participants {
  @apply
  flex
  flex-col
  gap-3
  items-center
  relative
  w-full
  h-[100vh]
  pt-[10vh]
  mb-[10vh]
  overflow-x-hidden
  md:pt-11
  md:mb-[20vh]
  md:h-[200vh];
  &_logo {
    @apply w-[30vh] md:hidden;
  }
  &_cloud {
    @apply absolute top-[50%] md:top-[23%] -z-[1];
  }
  &_group {
    @apply flex flex-col gap-3 items-center md:flex-row md:w-[90vh] md:justify-between md:-translate-x-6;
  }
  &_title {
    @apply bg-highlight text-white md:-translate-y-6;
  }
  &_logoText {
    @apply w-[70vh] hidden md:block;
  }
}

.f2e_start {
  @apply hidden md:block absolute -top-1 -z-[1] w-[120vh]
}
</style>