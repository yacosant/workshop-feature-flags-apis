<template>
  <div>
    <ApiHealthTable v-if="featureFlags.isEnabled('showApiHealthTable')" />
    <FeatureFlag name="showNewText">
      <p style="color: green; font-weight: bold;">¡Este texto solo aparece si el feature flag 'showNewText' está activo!
      </p>
    </FeatureFlag>
    <p v-if="featureFlags.isEnabled('showNewText')" style="color: blue;">Texto usando isEnabled directamente.</p>
    <h2>Feature Flags (SSR)</h2>
    <FeatureFlagsTable />
    <h2>Feature Flags (Cliente - Estado global)</h2>
    <ClientOnly>
      <FeatureFlagsTable />
    </ClientOnly>
    <AutoReloadTimer v-if="featureFlags.isEnabled('showAutoReload')" :interval="15" @reload="reloadFeatureFlags" />
    <h2>Feature Flags (Cliente - Fetch directo API y "reload")</h2>
    <ClientOnly>
      <FeatureFlagsTable source="api" :reload-key="reloadKey" />
    </ClientOnly>
    <ClientOnly>
      <ClientOnlyMessage :reload-key="reloadKey" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApiHealthTable from './components/ApiHealthTable.vue';
import AutoReloadTimer from './components/AutoReloadTimer.vue';
import FeatureFlag from './components/FeatureFlag.vue';
import ClientOnlyMessage from './components/ClientOnlyMessage.vue';
import FeatureFlagsTable from './components/FeatureFlagsTable.vue';
import { useFeatureFlags } from './services/featureFlags';

const featureFlags = useFeatureFlags();
const reloadKey = ref(0);

function reloadFeatureFlags() {
  reloadKey.value++;
}
</script>
