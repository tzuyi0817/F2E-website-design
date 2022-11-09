<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import JoinBtn from '@/components/JoinBtn.vue';
import start from '@/assets/main/date_start.png';
import upload from '@/assets/main/date_upload.png';
import { swipeUp } from '@/utils/gsap';

const schedules = ref<HTMLUListElement | null>(null);
const schedulesList = [
  {
    class: 'f2e_schedule_left',
    src: '',
    title: 'SIGN UP',
    date: '10/13 - 11/6',
    description: '截止前可修改報名組別',
  },
  {
    class: 'f2e_schedule_middle',
    src: start,
    title: 'START',
    date: '10/31 - 11/28',
    description: '10/31(一) UI、團體組開賽<br/>11/7(一) 前端組開賽',
  },
  {
    class: 'f2e_schedule_right',
    src: upload,
    title: 'UPLOAD',
    date: '10/31 - 11/28',
    description: '依賽程登錄作品<p class="text-highlight text-base">額外競賽: 主題豐厚獎金等著你</p>',
  },
];

async function setScheduleGsap(className: string) {
  if (!schedules.value) {
    await nextTick();
    setScheduleGsap(className);
    return;
  }
  const element = schedules.value.getElementsByClassName(className)[0];

  swipeUp(element);
}
</script>

<template>
  <div class="f2e_schedule">
    <title-frame content="重要時程" />
    
    <ul ref="schedules" class="translate-y-[8%]">
      <li v-for="schedule in schedulesList" :key="schedule.class" :class="schedule.class">
        <img
          v-if="schedule.src"
          :src="schedule.src" 
          alt=""
          class="w-[140px]"
          @load="() => setScheduleGsap(schedule.class)"
        />
        <join-btn v-else @loaded="() => setScheduleGsap(schedule.class)" />
        <h1 class="text-highlight">{{ schedule.title }}</h1>
        <h3 class="text-white bg-primary badge">{{ schedule.date }}</h3>
        <h3 class="text-secondary-dark" v-html="schedule.description"></h3>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_schedule {
  @apply min-h-[1200px];
  li {
    @apply flex flex-col sm:flex-row justify-center items-center mb-20 gap-4 text-center;
  }
  :deep(.join_btn_hand) {
    @apply w-14;
  }
  :deep(.join_btn_icon) {
    @apply w-28;
  }
}
</style>