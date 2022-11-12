<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import TitleFrame from '@/components/TitleFrame.vue';
import JoinBtn from '@/components/JoinBtn.vue';
import {
  gsap,
  gsapMap,
  ScrollTrigger,
  slideInSideways,
  hide,
  removeTrigger,
  killTrigger,
} from '@/utils/gsap';

const themes = ref<HTMLUListElement | null>(null);
const { isMobile } = storeToRefs(useFlagStore());

async function setThemeGsap(className: string) {
  if (!isMobile.value) return;
  if (!themes.value) {
    await nextTick();
    setThemeGsap(className);
    return;
  }
  const element = themes.value.getElementsByClassName(className)[0];
  const memoAnimate = gsapMap.get(`themes_mobile`) ?? {};
  const trigger = ScrollTrigger.create({
    trigger: element,
    onEnter() {
      themeAnimated(element);
    },
    onLeaveBack() {
      hide(element);
    },
  });

  gsapMap.set('themes_mobile', { ...memoAnimate, [className]: trigger });
}

function themeAnimated(element: Element) {
  const positionMap = {
    'f2e_theme_left': 200,
    'f2e_theme_middle': -200,
    'f2e_theme_right': 200,
  };
  const className = element.className as keyof typeof positionMap;
  const x = positionMap[className];

  slideInSideways(element, x);
}

function setDesktopGsap() {
  if (isMobile.value) return;
  const trigger = gsap.timeline({
    scrollTrigger: {
      trigger: '.f2e_theme',
      pin: true,
      end: 'bottom 100%',
      scrub: true,
    },
  });

  removeTrigger('themes_mobile');
  reset();
  gsapMap.set('themes_desktop', trigger);
  trigger
    .to({}, { duration: 10 })
    .to('.f2e_theme_title', { autoAlpha: 1, duration: 2 })
    .to({}, { duration: 5 })
    .to('.f2e_theme_content', { yPercent: 0, autoAlpha: 1, duration: 5 })
    .to({}, { duration: 10 })
    .to('.f2e_theme', { autoAlpha: 0 })
}

function reset() {
  gsap.set('.f2e_theme_content', {
    yPercent: isMobile.value ? 0 : 30,
    autoAlpha: isMobile.value ? 1 : 0,
  });
  gsap.set('.f2e_theme', { autoAlpha: 1 });
}

watch(isMobile, (isMobile) => {
  if (isMobile) {
    killTrigger('themes_desktop')
    reset();
    setThemeGsap('f2e_theme_left');
    setThemeGsap('f2e_theme_middle');
    setThemeGsap('f2e_theme_right');
  } else {
    setDesktopGsap();
  }
});

onMounted(setDesktopGsap);
</script>

<template>
  <div class="f2e_theme">
    <title-frame 
      content="本屆主題:互動式網頁設計?"
      description="以下兩個角色進行攜手合作"
      class="f2e_theme_title"
    />

    <ul ref="themes" class="f2e_theme_content">
      <li class="f2e_theme_left">
        <img
          src="@/assets/character/character_f2e.png" 
          alt=""
          @load="() => setThemeGsap('f2e_theme_left')"
        />
        <join-btn class="f2e_theme_join" :isHoverHand="true">
          <h3>前端工程師</h3>
        </join-btn>
      </li>
      <li class="f2e_theme_middle">
        <join-btn class="f2e_theme_join" :isHoverHand="true">
          <h3>UI設計師</h3>
        </join-btn>
        <img
          src="@/assets/character/character_ui.png"
          alt=""
          @load="() => setThemeGsap('f2e_theme_middle')"
        />
      </li>
      <li class="f2e_theme_right">
        <img
          src="@/assets/character/character_team.png"
          alt=""
          @load="() => setThemeGsap('f2e_theme_right')"
        />
        <join-btn class="f2e_theme_join" :isHoverHand="true">
          <h3>團體組(UI+前端)</h3>
        </join-btn>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_theme {
  @apply pt-20 w-full min-h-[1235px] md:pt-0 md:min-h-[200vh];
  ul {
    @apply
    flex 
    flex-col
    justify-center
    items-center
    overflow-hidden
    md:flex-row
    md:gap-[20vh];
    li {
      @apply flex px-5 items-center justify-center;
      img {
        @apply w-1/2 md:hidden;
      }
    }
  }
  &_join {
    @apply w-1/2 md:w-[80px];
    h3 {
      @apply text-primary m-4 whitespace-nowrap;
    }
  }
  :deep(.join_btn_hand) {
    @apply w-14;
  }
  :deep(.join_btn_icon) {
    @apply w-28;
  }
}
</style>