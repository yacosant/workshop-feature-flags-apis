// Servicio para obtener los feature flags desde una URL completa
export async function fetchFeatureFlagsFromUrl(url: string) {
  const flags: Record<string, boolean> = await $fetch(url);
  return {
    flags,
  };
}

// Servicio para obtener los feature flags desde la API externa usando $fetch (funciona en SSR y cliente Nuxt)
export async function fetchFeatureFlagsApi() {
  // $fetch está disponible en setup/plugin/context Nuxt
  const flags: Record<string, boolean> = (await fetchFeatureFlagsFromUrl('/api/features')).flags;
  function isEnabled(name: string): boolean {
    return !!flags?.[name];
  }
  return {
    isEnabled,
    flags,
  };
}

// Servicio para guardar los flags en el estado global (solo llamar en setup/plugin)
export function setFeatureFlags(flags: any) {
  const state = useState('feature-flags', () => flags);
  state.value = flags;
}

// Composable para usar los flags en componentes (solo en setup)
export function useFeatureFlags() {
  const flags = useState<Record<string, boolean>>('feature-flags', () => ({}));
  function isEnabled(name: string): boolean {
    return !!flags.value?.[name];
  }
  return {
    isEnabled,
    flags,
  };
}

