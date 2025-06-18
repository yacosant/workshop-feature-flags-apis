import { find } from '../services/mongoService';

const featureFlags = {
  showApiHealthTable: true,
  showAutoReload: true,
  showNewText: true,
  showExtraValue: true
}

export default defineEventHandler(async () => {
  const featureFlagsFromService = await find('featureFlags', {});

  const dbFlags = Array.isArray(featureFlagsFromService)
    ? featureFlagsFromService.reduce((acc, doc) => {
      if (doc.name !== undefined && doc.value !== undefined) {
        acc[doc.name] = doc.value;
      }
      return acc;
    }, {} as Record<string, any>)
    : {};

  return {
    ...featureFlags,
    ...dbFlags
  };
})
