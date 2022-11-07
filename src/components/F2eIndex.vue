<script setup lang="ts">
import F2eParticipants from '@/components/F2eParticipants.vue';
import F2eQuestions from '@/components/F2eQuestions.vue';
import F2eCharacters from '@/components/F2eCharacters.vue';
</script>

<template>
  <div class="f2e_index">
    <img src="@/assets/logo/logo.png" alt="" class="w-[30vh]" />
    <h3 class="bg-highlight badge">互動式網頁設計</h3>
    <f2e-participants />
    <f2e-questions />
    <f2e-characters />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_index {
  @apply flex flex-col items-center gap-3;
}
</style>