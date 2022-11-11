<script setup lang="ts">
import F2eHeader from '@/components/F2eHeader.vue';
import { useFlagStore } from '@/store';
import { debounce } from '@/utils/common';

const { setInnerSize } = useFlagStore();

setInnerSize(window.innerWidth);

window.addEventListener('resize', debounce(() => {
  setInnerSize(window.innerWidth);
}, 300));
</script>

<template>
  <f2e-header />
  <router-view />
</template>
