<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import week1 from '@/assets/main/week_1.png';
import week2 from '@/assets/main/week_2.png';
import week3 from '@/assets/main/week_3.png';
import { gsap, gsapMap, swipeUp, removeTrigger, killTrigger } from '@/utils/gsap';

const stages = ref<HTMLUListElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());
const stagesList = [
  {
    class: 'f2e_stage_left',
    src: week1,
    title: 'WEEK 1',
    description: 'The F2E 活動網站設計',
    infos: ['Parallax Scrolling', '#板塊設計'],
    link: 'https://2022.thef2e.com/news/week1',
  },
  {
    class: 'f2e_stage_middle',
    src: week2,
    title: 'WEEK 2',
    description: '今晚 , 我想來點點簽',
    infos: ['Canvas', '#凱細行動科技'],
    link: 'https://2022.thef2e.com/news/week2',
  },
  {
    class: 'f2e_stage_right',
    src: week3,
    title: 'WEEK 3',
    description: 'Scrum 新手村',
    infos: ['JS draggable', '#鈦坦科技'],
    link: 'https://2022.thef2e.com/news/week3',
  },
];

async function setStageGsap(className: string) {
  if (!isMobile.value) return;
  if (!stages.value) {
    await nextTick();
    setStageGsap(className);
    return;
  }
  const element = stages.value.getElementsByClassName(className)[0];
  const memoAnimate = gsapMap.get(`stages_mobile`) ?? {};
  const trigger = swipeUp(element);

  gsapMap.set('stages_mobile', { ...memoAnimate, [className]: trigger });
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: '.t2e_stage',
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  removeTrigger('stages_mobile');
  reset();
  gsapMap.set('stages_desktop', trigger);
  trigger
    .to({}, { duration: 5 })
    .to('.f2e_stage_title', { autoAlpha: 1, duration: 2 })
    .to({}, { duration: 2 })
    .to('.t2e_stage_content', { yPercent: 0, duration: 5 })
    .to('.f2e_stage_left', { autoAlpha: 1, duration: 5 }, '<')

    .to('.t2e_stage_content', { yPercent: -30, duration: 5 })
    .to('.f2e_stage_left', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_stage_middle', { autoAlpha: 1, duration: 5 }, '<')

    .to('.t2e_stage_content', { yPercent: -60, duration: 5 })
    .to('.f2e_stage_middle', { autoAlpha: 0, duration: 5 }, '<')
    .to('.f2e_stage_right', { autoAlpha: 1, duration: 5 }, '<')

    .to('.t2e_stage_content', { yPercent: -90, duration: 5 })
    .to('.f2e_stage_right', { autoAlpha: 0, duration: 5 }, '<')

    .to({}, { duration: 5 })
    .to('.t2e_stage', { autoAlpha: 0, duration: 5 })
}

function reset() {
  const autoAlpha = isMobile.value ? 1 : 0;

  gsap.set('.t2e_stage_content', { yPercent: isMobile.value ? 0 : 30 });
  gsap.set('.f2e_stage_left', { xPercent: isMobile.value ? 0 : -20, autoAlpha });
  gsap.set('.f2e_stage_middle', { xPercent: isMobile.value ? 0 : 20, autoAlpha });
  gsap.set('.f2e_stage_right', { xPercent: isMobile.value ? 0 : -20, autoAlpha });
  gsap.set('.t2e_stage', { autoAlpha: 1 });
}

function goDetail(url: string) {
  window.location.href = url;
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('stages_desktop')
    reset();
    setStageGsap('f2e_stage_left');
    setStageGsap('f2e_stage_middle');
    setStageGsap('f2e_stage_right');
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="t2e_stage">
    <title-frame 
      content="年度最強合作 , 三大主題來襲"
      description="各路廠商強強聯手<br/>共同設計出接地氣的網頁互動挑戰關卡"
      class="f2e_stage_title"
    />

    <ul class="t2e_stage_content" ref="stages">
      <li v-for="stage in stagesList" :key="stage.class" :class="stage.class">
        <img
          :src="stage.src" 
          alt=""
          @load="() => setStageGsap(stage.class)"
        />
        <div class="flex flex-col justify-center items-center gap-2 mb-11">
          <h1 class="text-highlight">{{ stage.title }}</h1>
          <h2 class="text-primary">{{ stage.description }}</h2>
          <ul class="flex flex-col md:flex-row gap-3 p-2 items-center">
            <li v-for="(info, index) in stage.infos" :key="index" class="t2e_stage_info badge">
              <h4>{{ info }}</h4>
            </li>
          </ul>
          <button
            class="badge text-white text-lg bg-secondary-dark w-fit"
            @click="goDetail(stage.link)"
          >查看關卡細節</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.t2e_stage {
  @apply pt-20 w-full min-h-[1610px] md:min-h-[400vh] md:pt-0 overflow-hidden;
  &_content {
    @apply flex flex-col translate-y-[8%];
    li {
      @apply flex flex-col md:flex-row justify-center items-center gap-2;
      &.f2e_stage_middle {
        @apply md:flex-row-reverse;
      }
      img {
        @apply w-[200px];
      } 
    }
  }
  &_info {
    @apply text-secondary-dark border-secondary-dark border-2 w-fit;
  } 
}
</style>