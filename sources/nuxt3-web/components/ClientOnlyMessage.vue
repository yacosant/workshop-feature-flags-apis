<template>
  <div>
    <p style="color: red;">
      ¡Este mensaje solo aparece cuando el render es en el cliente!
      <span v-if="showExtraValue"> Y con showExtraValue</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchFeatureFlagsApi } from '../services/featureFlags';

const props = defineProps<{ reloadKey?: number }>();

const showExtraValue = ref<boolean>(true);

async function fetchAndUpdate() {
  const result = await fetchFeatureFlagsApi();
  showExtraValue.value = result.isEnabled('showExtraValue');
}

onMounted(async () => {
  fetchAndUpdate();
});

watch(() => props.reloadKey, () => {
  fetchAndUpdate();
});

</script>
