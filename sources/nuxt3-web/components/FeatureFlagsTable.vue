<template>
  <div class="overflow-x-auto mt-4 min-w-[350px]">
    <table class="min-w-full border border-gray-200 bg-white rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 text-left font-semibold text-gray-700">Feature Flag</th>
          <th class="px-6 py-4 text-left font-semibold text-gray-700">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in flagsToShow" :key="key" class="border-t hover:bg-gray-50 transition">
          <td class="px-6 py-4">{{ key }}</td>
          <td class="px-6 py-4">{{ value + '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useFeatureFlags, fetchFeatureFlagsApi } from '../services/featureFlags';

const props = defineProps<{ source?: 'api' | 'state', reloadKey?: number }>();

const { flags } = useFeatureFlags();
const apiFlags = ref<Record<string, any> | null>(null);

async function fetchAndUpdate() {
  const result = await fetchFeatureFlagsApi();
  apiFlags.value = result.flags;
}

if (process.client && props.source === 'api') {
  onMounted(() => {
    fetchAndUpdate();
  });
  watch(() => props.reloadKey, () => {
    fetchAndUpdate();
  });
}

const flagsToShow = computed(() => {
  if (props.source === 'api') {
    return apiFlags.value ?? {};
  }
  return flags.value ?? {};
});
</script>
