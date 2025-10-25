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
  return DEFAULT_CONFIGS[currentMode];
};

export default getCurrentConfig;
