<script setup lang="ts">

</script>

<template>
  <div class="f2e_map">
    <img src="@/assets/main/map.svg" alt="" />
    <div class="f2e_map_now">
      <img src="@/assets/main/map_now.svg" alt="" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.f2e_map {
  @apply hidden fixed left-[50px] bottom-[33px] md:block;
  &_now {
    @apply
    absolute 
    top-[62px] 
    left-3
    before:content-['']
    before:absolute
    before:w-1
    before:h-1
    before:rounded-full
    before:border-highlight
    before:left-[3px]
    before:top-[3px]
    before:border-[1px]
    before:animate-[ping_1s_infinite];
  }
}

@keyframes ping {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(8);
  }
}
</style>