<script setup lang="ts">
interface Props {
  isShowJoin?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['loaded']);
</script>

<template>
  <div class="join_btn">
    <p v-if="isShowJoin" class="text-xs text-primary">JOIN</p>
    <img
      src="@/assets/btn/btn_joinHand.png"
      alt=""
      class="join_btn_hand"
    />
    <img src="@/assets/btn/btn_join.png" alt="" class="join_btn_icon" @load="emit('loaded')" />
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.join_btn {
  @apply flex flex-col items-center;
  &_hand {
    @apply animate-bounce w-2/3 mt-2;
  }
}
</style>