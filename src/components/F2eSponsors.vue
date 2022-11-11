<script setup lang="ts">
import { ref, nextTick } from 'vue';
import TitleFrame from '@/components/TitleFrame.vue';
import { swipeUp } from '@/utils/gsap';

const sponsors = ref<HTMLUListElement | null>(null);

async function setSponsorGsap(className: string) {
  if (!sponsors.value) {
    await nextTick();
    setSponsorGsap(className);
    return;
  }
  const element = sponsors.value.getElementsByClassName(className)[0];

  swipeUp(element);
}
</script>

<template>
  <div class="f2e_sponsors">
    <title-frame content="贊助單位" />

    <ul class="flex flex-col md:flex-row pt-28" ref="sponsors">
      <li class="f2e_sponsors_sponsor blockStudio">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_blockstudio.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('blockStudio')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#板塊設計</h4>
      </li>
      <li class="f2e_sponsors_sponsor titanSoft">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_titansoft.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('titanSoft')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#鈦坦科技</h4>
      </li>
      <li class="f2e_sponsors_sponsor kdanMobile">
        <button class="f2e_sponsors_btn">
          <img src="@/assets/main/logo_kdanmobile.png" class="f2e_sponsors_image" alt="" />
          <img
            src="@/assets/btn/btn_sponsor.png"
            class="f2e_sponsors_frame"
            alt=""
            @load="() => setSponsorGsap('kdanMobile')"
          />
        </button>
        <h4 class="f2e_sponsors_name badge">#凱細科技</h4>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_sponsors {
  @apply min-h-[1500px];
  &_sponsor {
    @apply flex flex-col gap-4 items-center justify-center mb-11;
  }
  &_btn {
    @apply relative;
    &:active {
      .f2e_sponsors_frame {
        @apply content-[url(@/assets/btn/btn_sponsor_h.png)];
      }
    }
  }
  &_image {
    @apply absolute top-1/2 left-[calc(50%-3px)] -translate-x-1/2 -translate-y-1/2 w-[calc(100%-70px)];
  }
  &_frame {
    @apply min-w-[66.6%] max-w-[315px] min-h-[66.6%] max-h-[315px];
  }
  &_name {
    @apply text-secondary-dark border-secondary-dark border-2;
  }
}
</style>