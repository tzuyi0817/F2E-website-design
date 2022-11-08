<script setup lang="ts">

</script>

<template>
  <div class="f2e_traffic">
    <p class="text-center text-highlight text-base pr-2">READY?</p>
    <img
      width="120"
      src="@/assets/main/ready_frame.png"
      alt=""
    />
    <img
      src="@/assets/main/ready_3.png"
      alt=""
      class="f2e_traffic_light left-[16px]"
    />
    <img
      src="@/assets/main/ready_2.png"
      alt=""
      class="f2e_traffic_light left-[44px]"
    />
    <img
      src="@/assets/main/ready_1.png"
      alt=""
      class="f2e_traffic_light left-[73px]"
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_traffic {
  @apply absolute right-0 bottom-[30%];
  &_light {
    @apply
    absolute
    top-[38px]
    w-[19px];
  }
}
</style>