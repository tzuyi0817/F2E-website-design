<script setup lang="ts">

</script>

<template>
  <div class="f2e_traffic">
    <h3 class="f2e_traffic_ready">READY?</h3>
    <h3 class="f2e_traffic_go">GO!!</h3>
    <div class="relative">
      <img
        src="@/assets/main/ready_frame.png"
        alt=""
        />
      <img
        src="@/assets/main/ready_3.png"
        alt=""
        class="f2e_traffic_red f2e_traffic_light left-[13%]"
      />
      <img
        src="@/assets/main/ready_2.png"
        alt=""
        class="f2e_traffic_yellow f2e_traffic_light left-[37%]"
      />
      <img
        src="@/assets/main/ready_1.png"
        alt=""
        class="f2e_traffic_green f2e_traffic_light left-[60.5%]"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_traffic {
  @apply absolute right-0 top-[60%] min-w-[120px] max-w-[275px] md:top-[25%] w-[15vw] md:origin-right;
  &_light {
    @apply
    absolute
    top-[31%]
    w-[16%];
  }
  &_ready, .f2e_traffic_go {
    @apply text-highlight text-center pr-2;
  }
  &_go {
    @apply absolute top-0 left-1/2 -translate-x-1/2 opacity-0;
  }
}
</style>