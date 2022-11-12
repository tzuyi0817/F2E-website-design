<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import JoinBtn from '@/components/JoinBtn.vue';
import start from '@/assets/main/date_start.png';
import upload from '@/assets/main/date_upload.png';
import { gsap, gsapMap, swipeUp, removeTrigger, killTrigger } from '@/utils/gsap';

const schedules = ref<HTMLUListElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());
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
  if (!isMobile.value) return;
  if (!schedules.value) {
    await nextTick();
    setScheduleGsap(className);
    return;
  }
  const element = schedules.value.getElementsByClassName(className)[0];
  const memoAnimate = gsapMap.get(`schedules_mobile`) ?? {};
  const trigger = swipeUp(element);

  gsapMap.set('schedules_mobile', { ...memoAnimate, [className]: trigger });
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_schedule',
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  removeTrigger('schedules_mobile');
  reset();
  gsapMap.set('schedules_desktop', trigger);
  trigger
    .to({}, { duration: 5 })
    .to('.f2e_schedule_line', { scale: 1, duration: 5 })

    .to({}, { duration: 2 })
    .to('.f2e_schedule_left', { autoAlpha: 1, duration: 5 })
    .to('.f2e_schedule_left .f2e_schedule_weekLine', { scale: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_schedule_middle', { autoAlpha: 1, duration: 5 })
    .to('.f2e_schedule_middle .f2e_schedule_weekLine', { scale: 1, duration: 5 }, '<')

    .to({}, { duration: 2 })
    .to('.f2e_schedule_right', { autoAlpha: 1, duration: 5 })
    .to('.f2e_schedule_right .f2e_schedule_weekLine', { scale: 1, duration: 5 }, '<')

    .to({}, { duration: 5 })
    .to('.f2e_schedule', { autoAlpha: 0, duration: 5 });
}

function reset() {
  const autoAlpha = isMobile.value ? 1 : 0;

  gsap.set('.f2e_schedule', { autoAlpha: 1, top: 0 });
  gsap.set('.f2e_schedule_left', { y: -40, yPercent: 0, autoAlpha });
  gsap.set('.f2e_schedule_middle', { y: 0, yPercent: 0, autoAlpha });
  gsap.set('.f2e_schedule_right', { y: 0, yPercent: 0, autoAlpha });
  gsap.set('.f2e_schedule_left .f2e_schedule_weekLine', { scale: 0 });
  gsap.set('.f2e_schedule_middle .f2e_schedule_weekLine', { scale: 0 });
  gsap.set('.f2e_schedule_right .f2e_schedule_weekLine', { scale: 0 });
  gsap.set('.f2e_schedule_line', { scale: 0 });
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('schedules_desktop');
    reset();
    setScheduleGsap('f2e_schedule_left');
    setScheduleGsap('f2e_schedule_middle');
    setScheduleGsap('f2e_schedule_right');
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="f2e_schedule">
    <title-frame content="重要時程" class="md:hidden" />
    
    <ul ref="schedules" class="f2e_schedule_content">
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
        <h4 class="text-secondary-dark" v-html="schedule.description"></h4>

        <div class="f2e_schedule_weekLine">
          <img class="w-8" src="@/assets/main/date_weekLine.png" alt="" />
        </div>
      </li>
    </ul>

    <img class="f2e_schedule_line" src="@/assets/main/date_line.png" alt="" />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_schedule {
  @apply min-h-[1200px] w-full flex flex-col items-center md:min-h-[300vh];
  li {
    @apply
    flex 
    flex-col 
    justify-center 
    items-center 
    mb-20 
    gap-4
    relative
    text-center;
  }
  &_content {
    @apply
    translate-y-[8%]
    flex
    flex-col
    justify-center
    items-center
    md:flex-row
    md:pt-10
    md:gap-44;
  }
  &_weekLine {
    @apply w-8 absolute hidden md:block overflow-hidden origin-bottom;
  }
  &_left {
    .f2e_schedule_weekLine {
      @apply top-[calc(100%+30px)] h-[140px];
    }
  }
  &_middle {
    .f2e_schedule_weekLine {
      @apply top-[calc(100%+32px)] h-[70px];
      img {
        @apply -translate-y-[72px];
      }
    }
  }
  &_right {
    .f2e_schedule_weekLine {
      @apply top-[calc(100%+30px)] h-[110px];
      img {
        @apply -translate-y-8;
      }
    }
  }
  &_line {
    @apply hidden md:block max-w-[1440px] mt-8;
  }
  :deep(.join_btn_hand) {
    @apply w-14;
  }
  :deep(.join_btn_icon) {
    @apply w-28;
  }
}
</style>