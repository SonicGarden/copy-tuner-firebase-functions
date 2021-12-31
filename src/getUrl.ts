import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<{ url: string }> => {
  const {
    copy_tuner: { host, api_key: apiKey, environment },
  } = functions.config();
  const url = environment === 'staging' ? `${host}/projects/${apiKey}` : '';

  return { url };
};

export const getCopyTunerUrl = ({
  region = 'asia-northeast1',
}: {
  region?: string;
}): functions.CloudFunction<unknown> => {
  return functions.region(region).https.onCall(async () => {
    return await getUrl();
  });
};
