import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<{ url: string }> => {
  const {
    copy_tuner: { host, api_key: apiKey, environment },
  } = functions.config();

  return { url: environment === 'staging' ? `${host}/projects/${apiKey}` : '' };
};

export const getCopyTunerUrl = functions.region('asia-northeast1').https.onCall(async () => {
  return await getUrl();
});
