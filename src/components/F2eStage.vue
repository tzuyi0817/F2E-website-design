<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import week1 from '@/assets/main/week_1.png';
import week2 from '@/assets/main/week_2.png';
import week3 from '@/assets/main/week_3.png';
import { swipeUp } from '@/utils/gsap';

const stages = ref<HTMLUListElement | null>(null);
const stagesList = [
  {
    class: 'f2e_stage_left',
    src: week1,
    title: 'WEEK 1',
    description: 'The F2E 活動網站設計',
    infos: ['Parallax Scrolling', '#板塊設計'],
  },
  {
    class: 'f2e_stage_middle',
    src: week2,
    title: 'WEEK 2',
    description: '今晚 , 我想來點點簽',
    infos: ['Canvas', '#凱細行動科技'],
  },
  {
    class: 'f2e_stage_right',
    src: week3,
    title: 'WEEK 3',
    description: 'Scrum 新手村',
    infos: ['JS draggable', '#鈦坦科技'],
  },
];

async function setStageGsap(className: string) {
  if (!stages.value) {
    await nextTick();
    setStageGsap(className);
    return;
  }
  const element = stages.value.getElementsByClassName(className)[0];

  swipeUp(element);
}
</script>

<template>
  <div class="t2e_stage">
    <title-frame 
      content="年度最強合作 , 三大主題來襲"
      description="各路廠商強強聯手<br/>共同設計出接地氣的網頁互動挑戰關卡"
    />

    <ul class="t2e_stage_content" ref="stages">
      <li v-for="stage in stagesList" :key="stage.class" :class="stage.class">
        <img
          :src="stage.src" 
          alt=""
          @load="() => setStageGsap(stage.class)"
        />
        <div class="flex flex-col justify-center items-center gap-2">
          <h1 class="text-highlight">{{ stage.title }}</h1>
          <h2 class="text-primary">{{ stage.description }}</h2>
          <ul class="flex flex-col sm:flex-row gap-3 p-2 items-center">
            <li v-for="(info, index) in stage.infos" :key="index" class="t2e_stage_info badge">
              <h4>{{ info }}</h4>
            </li>
          </ul>
          <button class="badge text-white text-lg bg-secondary-dark w-fit">查看關卡細節</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.t2e_stage {
  @apply pt-20 min-h-[1610px];
  &_content {
    @apply flex flex-col translate-y-[8%];
    .f2e_stage_left, .f2e_stage_middle, .f2e_stage_right {
      @apply flex flex-col sm:flex-row justify-center items-center mb-11 gap-2;
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