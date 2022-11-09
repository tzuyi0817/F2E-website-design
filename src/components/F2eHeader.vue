<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const F2eMenu = defineAsyncComponent(() => import('@/components/F2eMenu.vue'));
</script>

<template>
  <header class="f2e_header">
    <div class="w-10"></div>
    <img src="@/assets/logo/logo_text.png" width="133" alt="" />

    <button class="f2e_header_user">
      <img src="@/assets/btn/btn_user.png" width="40" height="40" alt="" />
    </button>

    <f2e-menu />
  </header>
</template>

<style lang="postcss" scoped>
.f2e_header {
  @apply fixed flex items-center justify-between w-full h-[59px] pr-2 z-[1] bg-bg;
  &_user {
    &:hover {
      img {
        @apply content-[url(@/assets/btn/btn_user_h.png)];
      }
    }
    &:active {
      img {
        @apply content-[url(@/assets/btn/btn_user_p.png)];
      }
    }
  }
}
</style>