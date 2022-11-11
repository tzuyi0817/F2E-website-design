<script setup lang="ts">

</script>

<template>
  <div class="f2e_traffic">
    <p class="f2e_traffic_ready">READY?</p>
    <p class="f2e_traffic_go">GO!!</p>
    <img
      width="120"
      src="@/assets/main/ready_frame.png"
      alt=""
    />
    <img
      src="@/assets/main/ready_3.png"
      alt=""
      class="f2e_traffic_red f2e_traffic_light left-[16px]"
    />
    <img
      src="@/assets/main/ready_2.png"
      alt=""
      class="f2e_traffic_yellow f2e_traffic_light left-[44px]"
    />
    <img
      src="@/assets/main/ready_1.png"
      alt=""
      class="f2e_traffic_green f2e_traffic_light left-[73px]"
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_traffic {
  @apply absolute right-0 top-[60%] md:top-[25%] md:scale-[200%] md:origin-right;
  &_light {
    @apply
    absolute
    top-[38.5px]
    w-[18.5px];
  }
  &_ready, .f2e_traffic_go {
    @apply text-highlight text-center text-base pr-2;
  }
  &_go {
    @apply absolute top-0 left-1/2 -translate-x-1/2 opacity-0;
  }
}
</style>