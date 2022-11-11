<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const F2eMenu = defineAsyncComponent(() => import('@/components/F2eMenu.vue'));
</script>

<template>
  <header class="f2e_header">
    <div class="w-10"></div>
    <img src="@/assets/logo/logo_text.png" width="133" alt="" class="md:invisible" />
    <img src="@/assets/logo/logo.png" alt="" class="f2e_header_logo" />

    <a class="f2e_header_user" href="https://2022.thef2e.com/users">
      <img src="@/assets/btn/btn_user.png" alt="" />
    </a>

    <f2e-menu />
  </header>
</template>

<style lang="postcss" scoped>
.f2e_header {
  @apply
  fixed
  flex
  items-center
  justify-between
  w-full
  h-[59px]
  pr-2
  z-10
  bg-bg
  md:bg-transparent
  md:h-28;
  &_user {
    @apply h-10 w-10 md:h-20 md:w-20;
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
  &_logo {
    @apply hidden md:block absolute left-10 top-[30px] w-[20vh] opacity-0;
  } 
}
</style>