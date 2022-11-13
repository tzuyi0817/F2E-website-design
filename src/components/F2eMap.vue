<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFlagStore } from '@/store';
import { createTimeLine } from '@/utils/gsap';

const mapNow = ref<HTMLDivElement | null>(null);
const mapPath = ref<SVGPathElement  | null>(null);

function setMapGsap() {
  const questionsTimeLine = createTimeLine('.f2e_questions');
  const themesTimeLine = createTimeLine('.f2e_theme');
  const stagesTimeLine = createTimeLine('.t2e_stage');
  const schedulesTimeLine = createTimeLine('.f2e_schedule');
  const contestTimeLine = createTimeLine('.f2e_contest');
  const sponsorsTimeLine = createTimeLine('.f2e_sponsors');
  const applyTimeLine = createTimeLine('.f2e_apply');

  move(questionsTimeLine, 0.92, 1.02);
  move(themesTimeLine, 0.02, 0.13);
  move(stagesTimeLine, 0.13, 0.25);
  move(schedulesTimeLine, 0.25, 0.391);
  move(contestTimeLine, 0.391, 0.63);
  move(sponsorsTimeLine, 0.63, 0.715);
  move(applyTimeLine, 0.715, 0.824);
}

function move(timeline: gsap.core.Timeline, start: number, end: number) {
  if (!mapPath.value) return;

  timeline.to(mapNow.value, {
    ease: 'power1.inOut',
    duration: 5,
    motionPath: {
      path: mapPath.value,
      align: mapPath.value,
      autoRotate: true,
      alignOrigin: [0.6, 0.6],
      start,
      end,
    }
  });

  if (end !== 0.824) return;
  timeline
    .to('.f2e_map_end', { fill: '#FF5136', duration: 5 })
    .to('.f2e_map_flag', { stroke: '#FF5136', duration: 5 }, '<');
}

onMounted(setMapGsap);
</script>

<template>
  <div class="f2e_map">
    <svg width="254" height="166" viewBox="0 0 254 166" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path ref="mapPath" d="M46.5509 22.4027C76.0557 5.30417 108.351 18.2606 120.811 26.8762C134.268 33.9175 157.692 22.4027 175.136 26.8762C192.579 31.3496 195.071 26.8762 216.502 26.8762C237.933 26.8762 250.393 34.829 234.444 42.7818C218.496 50.7346 203.544 75.0901 199.557 78.0724C195.57 81.0547 181.615 81.0547 167.66 94.4751C153.705 107.895 174.773 42.7818 158.689 42.7818C142.605 42.7818 150.715 95.4692 141.744 104.416C127.789 118.333 96.8883 134.239 89.4124 148.157C81.9365 162.074 82.6213 149.275 52.5315 129.269C22.4417 109.263 17.1458 89.0075 17.1458 81.0547L17.1458 80.9747C17.1455 72.879 17.1441 39.4445 46.5509 22.4027Z" stroke="#FFE2A9" stroke-width="10"/>
      <circle cx="17" cy="67" r="7.5" fill="#007FAB" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="58.6667" cy="17" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="128.667" cy="27" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="208.667" cy="27" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="198.667" cy="77" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="143.667" cy="102" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle cx="98.6667" cy="137" r="7.5" fill="#FFC37D" stroke="#FFE2A9" stroke-width="5" />
      <circle class="f2e_map_end" cx="43.6667" cy="122" r="7.5" fill="#007FAB" stroke="#FFE2A9" stroke-width="5" />
      <path class="f2e_map_end" d="M58.5058 100.256L43.5541 92.4805V106.132L58.5058 100.256Z" fill="#007FAB" />
      <path class="f2e_map_flag" d="M43.5541 123.298V106.132M43.5541 106.132V92.4805L58.5058 100.256L43.5541 106.132Z" stroke="#007FAB" stroke-width="5" stroke-linejoin="round" />
    </svg>
    <div class="f2e_map_now" ref="mapNow">
      <img src="@/assets/main/map_now.svg" alt="" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_map {
  @apply hidden fixed left-[50px] bottom-[33px] md:block;
  &_now {
    @apply
    absolute 
    top-[62px] 
    left-3
    before:content-['']
    before:absolute
    before:w-1
    before:h-1
    before:rounded-full
    before:border-highlight
    before:left-[3px]
    before:top-[3px]
    before:border-[1px]
    before:animate-[ping_1s_infinite];
  }
}

@keyframes ping {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(8);
  }
}
</style>