<script setup lang="ts">
import { ref } from 'vue';
import JoinBtn from '@/components/JoinBtn.vue';
import { swipeUp } from '@/utils/gsap';

const apply = ref<HTMLDivElement | null>(null);

function setApplyGsap() {
  swipeUp(apply.value);
}
</script>

<template>
  <div class="f2e_apply" ref="apply">
    <img src="@/assets/logo/logo.png" class="f2e_apply_logo" alt="" @load="setApplyGsap" />
    <join-btn class="f2e_apply_join">
      <h1 class="text-highlight whitespace-nowrap mt-5">立即報名</h1>
    </join-btn>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_apply {
  @apply flex flex-col items-center gap-10 my-32;
  &_logo {
    @apply w-3/5 max-w-[520px];
  }
  &_join {
    @apply w-[22%] max-w-[180px];
  }
}
</style>