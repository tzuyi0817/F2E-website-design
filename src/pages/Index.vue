<script setup lang="ts">
import F2eParticipants from '@/components/F2eParticipants.vue';
import F2eTraffic from '@/components/F2eTraffic.vue';
import F2eQuestions from '@/components/F2eQuestions.vue';
import F2eCharacters from '@/components/F2eCharacters.vue';
import F2eTheme from '@/components/F2eTheme.vue';
import F2eStage from '@/components/F2eStage.vue';
import F2eSchedule from '@/components/F2eSchedule.vue';
import BigTitle from '@/components/BigTitle.vue';
</script>

<template>
  <div class="f2e_index">
    <f2e-participants />
    <f2e-traffic />
    <f2e-questions />
    <f2e-theme />
    <f2e-stage />
    <f2e-schedule />
    <big-title />
    <f2e-characters />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_index {
  @apply flex flex-col items-center gap-3 pt-[10vh];
}
</style>
