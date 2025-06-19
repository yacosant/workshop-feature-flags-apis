<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">WEB y APIs</h1>
    <div class="overflow-x-auto mt-8 min-w-[350px]">
      <table class="min-w-full border border-gray-200 bg-white rounded-lg shadow">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">name</th>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">url</th>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">status</th>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">database</th>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">url flags</th>
            <th class="px-6 py-4 text-left font-semibold text-gray-700">features</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="api in apis" :key="api.name" class="border-t hover:bg-gray-50 transition">
            <td class="px-6 py-4">{{ api.name }}</td>
            <td class="px-6 py-4 text-blue-700 truncate max-w-xs">{{ api.url }}</td>
            <td class="px-6 py-4">
              <span :class="api.status === 'OK' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'">{{ api.status
              }}</span>
            </td>
            <td class="px-6 py-4">{{ api.database }}</td>
            <td class="px-6 py-4 text-blue-700 truncate max-w-xs">{{ api.urlFlags || '' }}</td>
            <td class="px-6 py-4">
              <span v-if="api.features">{{ JSON.stringify(api.features) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apis as apiList, fetchHealth, type ApiHealth } from '../services/healthApis';

const apis = ref(JSON.parse(JSON.stringify(apiList)));

onMounted(() => {
  apis.value.forEach((api: ApiHealth) => fetchHealth(api));
});
</script>
