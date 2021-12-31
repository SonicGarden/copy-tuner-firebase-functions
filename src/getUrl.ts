import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<{ url: string }> => {
  const {
    copy_tuner: { host, api_key: apiKey, environment },
  } = functions.config();
  const url = environment === 'staging' ? `${host}/projects/${apiKey}` : '';

  return { url };
};

const defaultOptions = {
  region: 'asia-northeast1',
};

export const getCopyTunerUrl = (
  options: {
    region?: string;
  } = defaultOptions
): functions.CloudFunction<unknown> => {
  const { region } = { ...defaultOptions, ...options };

  return functions.region(region).https.onCall(async () => {
    return await getUrl();
  });
};
