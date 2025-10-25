type Environment = 'production' | 'development';

interface Config {
  baseURL: string;
  environment: Environment;
}

const DEFAULT_CONFIGS: Record<Environment, Config> = {
  production: {
    baseURL: 'https://dsvt1su3.articker.kr',
    environment: 'production',
  },
  development: {
    baseURL: 'https://dev.backend.articker.kr',
    environment: 'development',
  },
} as const;

const getCurrentConfig = (): Config => {
  // Vite 환경용 (빌드 시점에 교체됨)
  const currentMode = import.meta.env.MODE as Environment;
  const config = DEFAULT_CONFIGS[currentMode];

  if (!config) {
    console.warn(`Unknown environment mode: ${currentMode}.`);
    return DEFAULT_CONFIGS.development;
  }

  return config;
};

export default getCurrentConfig;
