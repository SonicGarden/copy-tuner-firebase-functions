import { env } from './lib/env';
import { functions } from './lib/firebase';

export const getUrl = async (): Promise<{ url: string }> => {
  const environment = env('ENVIRONMENT');
  const host = env('HOST');
  const apiKey = env('API_KEY');
  const url = environment === 'staging' ? `${host}/projects/${apiKey}` : '';

  return { url };
};

export const getCopyTunerUrl = functions().https.onCall(async () => {
  return await getUrl();
});
