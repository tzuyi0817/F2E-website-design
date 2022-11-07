<script setup lang="ts">
const participants = [
  { name: '前端工程師', peoples: 920 },
  { name: 'UI設計師', peoples: 110 },
  { name: '團體組', peoples: 41 },
]
</script>

<template>
  <div class="f2e_participants">
    <div v-for="({ name, peoples }, index) in participants" :key="index">
      <h3>{{ name }}</h3>
      <h4 class="bg-primary badge flex justify-center items-center gap-1">
        <img src="@/assets/icon/ic_users.svg" alt="" class="w-5" />{{ peoples }}
      </h4>
    </div>
    <img
      class="absolute w-28 left-0 -translate-x-6"
      src="@/assets/bg/bg_decorate_01.png"
      alt=""
    />
    <img
      class="absolute w-32 right-0 translate-x-6"
      src="@/assets/bg/bg_decorate_05.png"
      alt=""
    />
  </div>

  <div class="absolute right-0 bottom-[25%]">
    <p class="text-center highlight text-base pr-2">READY?</p>
    <img
      width="120"
      src="@/assets/main/ready_frame.png"
      alt=""
    />
    <img
      src="@/assets/main/ready_3.png"
      alt=""
      class="f2e_participants_light left-[16px]"
    />
    <img
      src="@/assets/main/ready_2.png"
      alt=""
      class="f2e_participants_light left-[44px]"
    />
    <img
      src="@/assets/main/ready_1.png"
      alt=""
      class="f2e_participants_light left-[73px]"
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_participants {
  @apply flex flex-col sm:flex-row gap-3 items-center justify-center relative w-full overflow-x-hidden;
  h3 {
    @apply text-primary text-center mb-2;
  }
  &_light {
    @apply
    absolute
    top-[38px]
    w-[19px];
  }
}
</style>