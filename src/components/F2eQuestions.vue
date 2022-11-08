<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import { ScrollTrigger, slideInSideways, hide } from '@/utils/gsap';

const questions = ref<HTMLUListElement | null>(null);

async function setQuestionsGsap(className: string) {
  if (!questions.value) {
    await nextTick();
    setQuestionsGsap(className);
    return;
  }
  const element = questions.value.getElementsByClassName(className)[0];

  ScrollTrigger.create({
    trigger: element,
    onEnter() {
      questionAnimated(element);
    },
    onLeaveBack() {
      hide(element);
    },
  });
}

function questionAnimated(element: Element) {
  const positionMap = {
    'f2e_questions_left': -200,
    'f2e_questions_middle': 0,
    'f2e_questions_right': 200,
  };
  const className = element.className as keyof typeof positionMap;
  const x = positionMap[className];

  slideInSideways(element, x);
}
</script>

<template>
  <div class="f2e_questions">
    <title-frame content="你是否也有以困擾?" />

    <ul ref="questions">
      <li class="f2e_questions_left">
        <h3 class="text-highlight">羨慕別人的酷酷網頁動畫?</h3>
        <img
          src="@/assets/main/question_1_m.png" 
          alt=""
          @load="() => setQuestionsGsap('f2e_questions_left')"
        />
      </li>
      <li class="f2e_questions_middle">
        <h3 class="text-highlight">滿足不了同事的許願?</h3>
        <img
          src="@/assets/main/question_2.png"
          alt=""
          @load="() => setQuestionsGsap('f2e_questions_middle')"
        />
      </li>
      <li class="f2e_questions_right">
        <h3 class="text-highlight">動畫技能樹太雜無從下手?</h3>
        <img
          src="@/assets/main/question_3_m.png"
          alt=""
          @load="() => setQuestionsGsap('f2e_questions_right')"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_questions {
  @apply min-h-[1150px];
  ul {
    @apply flex flex-col sm:flex-row justify-center items-center overflow-hidden;
    li {
      @apply w-4/5 text-center h-fit max-w-[465px] mb-10;
    }
  }
}
</style>