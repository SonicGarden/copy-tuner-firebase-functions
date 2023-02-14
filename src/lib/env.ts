import { config } from 'firebase-functions';

const {
  copy_tuner: { environment, region, host, s3_host, api_key },
} = config();

export const env = (name: string): string => {
  return {
    environment,
    region,
    host,
    s3_host,
    api_key
  }[name];
};
