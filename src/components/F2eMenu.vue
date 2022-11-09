<script setup lang="ts">
import { ref, computed } from 'vue';
import toggleBtnClose from '@/assets/btn/btn_burger_close.png';
import toggleBtnOpen from '@/assets/btn/btn_burger_open.png';

const isShowMenu = ref(false);
const offsetMenu = computed(() => {
  return isShowMenu.value
    ? 'translate-x-0'
    : '-translate-x-full sm:-translate-x-[calc(100%-15px)]';
});
const toggleBtnSrc = computed(() => isShowMenu.value ? toggleBtnClose : toggleBtnOpen);
const toggleBtnSrc_h = computed(() => {
  return isShowMenu.value
    ? 'hover:content-[url(/src/assets/btn/btn_burger_close_h.png)]'
    : 'hover:content-[url(/src/assets/btn/btn_burger_open_h.png)]';
});
const toggleBtnSrc_p = computed(() => {
  return isShowMenu.value
    ? 'active:content-[url(/src/assets/btn/btn_burger_close_p.png)]'
    : 'active:content-[url(/src/assets/btn/btn_burger_open_p.png)]';
});

function toggleMenu() {
  isShowMenu.value = !isShowMenu.value;
}
</script>

<template>
  <div v-if="isShowMenu" class="f2e_menu_mask"></div>
  <div :class="['f2e_menu', offsetMenu]">
    <ul>
      <li>
        <img
          src="@/assets/icon/ic_menu_info.png"
          width="60"
          height="60"
          alt=""
        />
        <p>關卡資訊</p>
      </li>
      <li>
        <img
          src="@/assets/icon/ic_menu_list.png"
          width="60"
          height="60"
          alt=""
        />
        <p>作品列表</p>
      </li>
      <li>
        <img
          src="@/assets/icon/ic_menu_strategy.png"
          width="60"
          height="60"
          alt=""
        />
        <p>攻略資源</p>
      </li>
      <li>
        <img
          src="@/assets/icon/ic_menu_job.png"
          width="60"
          height="60"
          alt=""
        />
        <p>求職專區</p>
      </li>
    </ul>

    <img
      :class="['f2e_menu_toggle', toggleBtnSrc_p, toggleBtnSrc_h]"
      :src="toggleBtnSrc" 
      width="40"
      height="40"
      @click="toggleMenu"
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_menu {
  @apply fixed w-[155px] bg-primary h-full top-0 left-0 transition-all duration-500;
  li {
    @apply
    flex
    flex-col
    justify-center
    items-center
    mt-10
    hover:brightness-125;
    p {
      @apply text-secondary mt-1;
    }
  }
  &_toggle {
    @apply
    absolute
    top-3
    sm:top-1/2
    left-[155px];
  }
  &_mask {
    @apply w-full h-full fixed bg-bg/80 top-0 left-0;
  }
}
</style>