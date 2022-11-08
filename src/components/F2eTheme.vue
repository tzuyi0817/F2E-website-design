<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import JoinBtn from '@/components/JoinBtn.vue';
import { ScrollTrigger, slideInSideways, hide } from '@/utils/gsap';

const themes = ref<HTMLUListElement | null>(null);

async function setThemeGsap(className: string) {
  if (!themes.value) {
    await nextTick();
    setThemeGsap(className);
    return;
  }
  const element = themes.value.getElementsByClassName(className)[0];

  ScrollTrigger.create({
    trigger: element,
    onEnter() {
      themeAnimated(element);
    },
    onLeaveBack() {
      hide(element);
    },
  });
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
</script>

<template>
  <div class="f2e_theme">
    <title-frame 
      content="本屆主題:互動式網頁設計?"
      description="以下兩個角色進行攜手合作"
    />

    <ul ref="themes">
      <li class="f2e_theme_left">
        <img
          src="@/assets/character/character_f2e.png" 
          alt=""
          @load="() => setThemeGsap('f2e_theme_left')"
        />
        <join-btn class="f2e_theme_join">
          <h3>前端工程師</h3>
        </join-btn>
      </li>
      <li class="f2e_theme_middle">
        <join-btn class="f2e_theme_join">
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
        <join-btn class="f2e_theme_join">
          <h3>團體組(UI+前端)</h3>
        </join-btn>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_theme {
  @apply pt-20 min-h-[1235px];
  ul {
    @apply flex flex-col sm:flex-row justify-center items-center overflow-hidden;
    li {
      @apply flex px-5 items-center justify-center;
      img {
        @apply w-1/2;
      }
    }
  }
  &_join {
    @apply w-1/2;
    h3 {
      @apply text-primary m-4;
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