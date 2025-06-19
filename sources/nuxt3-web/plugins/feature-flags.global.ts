import { fetchFeatureFlagsApi, setFeatureFlags } from '../services/featureFlags';

export default defineNuxtPlugin(async () => {
  const { flags } = await fetchFeatureFlagsApi();
  setFeatureFlags(flags);
});
