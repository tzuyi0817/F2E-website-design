<script setup lang="ts">
const participants = [
  { name: '前端工程師', peoples: 920 },
  { name: 'UI設計師', peoples: 110 },
  { name: '團體組', peoples: 41 },
]
</script>

<template>
  <div class="f2e_participants">
    <img src="@/assets/logo/logo.png" alt="" class="w-[30vh]" />
    <h3 class="bg-highlight badge text-white">互動式網頁設計</h3>

    <ul class="flex flex-col sm:flex-row gap-3 items-center">
      <li v-for="({ name, peoples }, index) in participants" :key="index">
        <h3 class="text-primary text-center mb-2">{{ name }}</h3>
        <h4 class="bg-primary badge text-white flex justify-center items-center gap-1">
          <img src="@/assets/icon/ic_users.svg" alt="" class="w-5" />{{ peoples }}
        </h4>
      </li>
    </ul>
    <img
      class="absolute w-28 left-0 top-[40%] -translate-x-6"
      src="@/assets/bg/bg_decorate_01.png"
      alt=""
    />
    <img
      class="absolute w-32 right-0 top-[40%] translate-x-6"
      src="@/assets/bg/bg_decorate_05.png"
      alt=""
    />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_participants {
  @apply
  flex
  flex-col
  gap-3
  items-center
  relative
  w-full
  h-screen
  overflow-x-hidden;
}
</style>