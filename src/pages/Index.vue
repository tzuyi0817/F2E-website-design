<script setup lang="ts">
import F2eParticipants from '@/components/F2eParticipants.vue';
import F2eQuestions from '@/components/F2eQuestions.vue';
import F2eCharacters from '@/components/F2eCharacters.vue';
import F2eTheme from '@/components/F2eTheme.vue';
import F2eStage from '@/components/F2eStage.vue';
import F2eSchedule from '@/components/F2eSchedule.vue';
import BigTitle from '@/components/BigTitle.vue';
import F2eContest from '@/components/F2eContest.vue';
import F2eSponsors from '@/components/F2eSponsors.vue';
import F2eApply from '@/components/F2eApply.vue';
import F2eMap from '@/components/F2eMap.vue';
</script>

<template>
  <div class="f2e_index">
    <f2e-participants />
    <f2e-questions />
    <f2e-theme />
    <f2e-stage />
    <f2e-schedule />
    <big-title />
    <f2e-contest />
    <f2e-sponsors />
    <f2e-apply />
    <f2e-characters />
    <f2e-map />
  </div>
</template>

<style lang="postcss" scoped>
.f2e_index {
  @apply flex flex-col items-center gap-3;
}
</style>
