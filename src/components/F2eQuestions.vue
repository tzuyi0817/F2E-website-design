<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import {
  gsap,
  ScrollTrigger,
  slideInSideways,
  hide,
  gsapMap,
  removeTrigger,
  killTrigger,
} from '@/utils/gsap';

const questions = ref<HTMLUListElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

async function setMobileGsap(className: string) {
  if (!isMobile.value) return;
  if (!questions.value) {
    await nextTick();
    setMobileGsap(className);
    return;
  }
  const element = questions.value.getElementsByClassName(className)[0];
  const memoAnimate = gsapMap.get(`questions_mobile`) ?? {};
  const trigger = ScrollTrigger.create({
    trigger: element,
    onEnter: () => questionAnimated(element),
    onLeaveBack:() => hide(element),
  });

  gsapMap.set('questions_mobile', { ...memoAnimate, [className]: trigger });
}

function questionAnimated(element: Element) {
  const positionMap = {
    'f2e_questions_left': -30,
    'f2e_questions_middle': 0,
    'f2e_questions_right': 30,
  };
  const className = element.className as keyof typeof positionMap;
  const x = positionMap[className];

  slideInSideways(element, x);
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_questions',
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  removeTrigger('questions_mobile');
  reset();
  gsapMap.set('questions_desktop', trigger);
  trigger
    .to({}, { duration: 5 })
    .to('.f2e_questions_title', { autoAlpha: 1, duration: 2 })
    .to('.f2e_characters_grass', { yPercent: -50, duration: 2 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_questions_left', { xPercent: 0, autoAlpha: 1, duration: 5 })
    .to('.f2e_characters_grass', { yPercent: -70, duration: 5 }, '<')
    .to('.f2e_characters_grass.left', { scale: 0.7, xPercent: 50, duration: 5 }, '<')
    .to('.f2e_characters_grass.right ', { scale: 0.7, xPercent: -50, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_questions_middle', { autoAlpha: 1, duration: 5 })
    .to('.f2e_characters_grass', { yPercent: -80, duration: 5 }, '<')
    .to('.f2e_characters_grass.left', { scale: 0.3, xPercent: 100, duration: 5 }, '<')
    .to('.f2e_characters_grass.right ', { scale: 0.3, xPercent: -100, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_questions_right', { xPercent: 0, autoAlpha: 1, duration: 5 })
    .to('.f2e_characters_grass', { yPercent: -85, duration: 5 }, '<')
    .to('.f2e_characters_grass.left', { scale: 0, xPercent: 150, duration: 5 }, '<')
    .to('.f2e_characters_grass.right ', { scale: 0, xPercent: -150, duration: 5 }, '<')

    .to({}, { duration: 10 })
    .to('.f2e_questions', { autoAlpha: 0 })
}

function reset() {
  const children = questions.value?.children ?? [];

  Array.from(children).forEach(question => {
    gsap.set(question, { autoAlpha: isMobile.value ? 1 : 0 });
  });
  gsap.set('.f2e_characters_grass', { scale: 1, yPercent: 100 });
  gsap.set('.f2e_questions_left', { xPercent: -30 });
  gsap.set('.f2e_questions_right', { xPercent: 30 });
  gsap.set('.f2e_questions', { autoAlpha: 1 });
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('questions_desktop');
    reset();
    setMobileGsap('f2e_questions_left');
    setMobileGsap('f2e_questions_middle');
    setMobileGsap('f2e_questions_right');
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="f2e_questions">
    <title-frame content="你是否也有以困擾?" class="f2e_questions_title" />

    <ul ref="questions" class="md:gap-5">
      <li class="f2e_questions_left">
        <h3 class="text-highlight">羨慕別人的酷酷網頁動畫?</h3>
        <img
          src="@/assets/main/question_1_m.png" 
          alt=""
          @load="() => setMobileGsap('f2e_questions_left')"
        />
      </li>
      <li class="f2e_questions_middle">
        <h3 class="text-highlight">滿足不了同事的許願?</h3>
        <img
          src="@/assets/main/question_2.png"
          alt=""
          @load="() => setMobileGsap('f2e_questions_middle')"
        />
      </li>
      <li class="f2e_questions_right">
        <h3 class="text-highlight">動畫技能樹太雜無從下手?</h3>
        <img
          src="@/assets/main/question_3_m.png"
          alt=""
          @load="() => setMobileGsap('f2e_questions_right')"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_questions {
  @apply min-h-[1150px] w-full md:min-h-[300vh];
  ul {
    @apply flex flex-col md:flex-row justify-center items-center overflow-hidden;
    li {
      @apply w-4/5 text-center h-fit max-w-[465px] mb-10;
    }
  }
  &_left > img {
    @apply md:content-[url(@/assets/main/question_1.png)];
  }
  &_right > img {
    @apply md:content-[url(@/assets/main/question_3.png)];
  }
}
</style>