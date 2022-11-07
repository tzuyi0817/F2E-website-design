<script setup lang="ts">

</script>

<template>
  <div class="f2e_characters">
    <div class="flex">
      <img class="w-[15vh]" src="@/assets/character/character_f2e.gif" alt="" />
      <img class="w-[16vh]" src="@/assets/character/character_ui.gif" alt="" />
      <img class="w-[15vh]" src="@/assets/character/character_team.gif" alt="" />
    </div>
    <img class="f2e_characters_road" src="@/assets/main/road.png" alt="" />
  </div>

</template>

<style lang="postcss" scoped>
.f2e_characters {
  @apply fixed bottom-0;
  &_road {
    @apply absolute w-full bottom-0 -z-[1]
  }
}
</style>