import { config } from 'firebase-functions';

const _envs = ['ENVIRONMENT', 'REGION', 'HOST', 'S3_HOST', 'API_KEY'] as const;

type Envs = typeof _envs[number];

const {
  copy_tuner: { environment, region, host, s3_host, api_key },
} = config();

export const env = (name: Envs): string => {
  return {
    ENVIRONMENT: environment,
    REGION: region,
    HOST: host,
    S3_HOST: s3_host,
    API_KEY: api_key,
  }[name as Envs];
};
