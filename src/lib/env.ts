import { config } from 'firebase-functions';

const stringEnvs = ['ENVIRONMENT', 'REGION', 'HOST', 'S3_HOST', 'API_KEY'] as const;
const arrayEnvs = ['LOCALES'] as const;

type StringEnvs = (typeof stringEnvs)[number];
type ArrayEnvs = (typeof arrayEnvs)[number];
type Envs = StringEnvs | ArrayEnvs;
type Env<T> = T extends ArrayEnvs ? string[] : T extends StringEnvs ? string : undefined;

const {
  copy_tuner: { environment, region, host, s3_host, api_key, locales },
} = config();

export const env = <T extends Envs>(name: T): Env<T> => {
  return {
    ENVIRONMENT: environment,
    REGION: region,
    HOST: host,
    S3_HOST: s3_host,
    API_KEY: api_key,
    LOCALES: locales.split(', '),
  }[name];
};
