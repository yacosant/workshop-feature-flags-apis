<template>
  <template v-if="isEnabled">
    <slot />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFeatureFlags } from '../services/featureFlags';

const props = defineProps<{ name: string }>();
const { isEnabled: isFlagEnabled } = useFeatureFlags();
const isEnabled = computed(() => isFlagEnabled(props.name));
</script>
