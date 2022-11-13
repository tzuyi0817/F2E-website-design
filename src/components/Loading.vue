<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import { sleep } from '@/utils/common';

const loadingPercent = ref(0);
const { isLoading } = storeToRefs(useFlagStore());
const isComplete = computed(() => !isLoading.value && loadingPercent.value >= 95);

async function setLoading() {
  if (loadingPercent.value === 95) return;
  const addPercent = loadingPercent.value >= 90 ? 1 : 30;

  await sleep(loadingPercent.value);
  loadingPercent.value += addPercent;
  requestAnimationFrame(setLoading);
}

onMounted(setLoading);
</script>

<template>
  <div class="loading" v-if="!isComplete">
    <img src="@/assets/main/loading.gif" alt="" />
    <div class="loading_progress">
      <div class="loading_bar"></div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.loading {
  @apply fixed w-full h-full flex flex-col items-center justify-center z-20 bg-bg;
  &_progress {
    @apply border-primary border-2 w-[80%] max-w-[500px] h-3 rounded-3xl;
  }
  &_bar {
    @apply bg-primary h-full transition-all duration-500 rounded-3xl;
    width: calc(v-bind(loadingPercent) * 1%);
  }
}
</style>