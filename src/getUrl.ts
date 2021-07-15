import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<string> => {
  const {
    copy_tuner: { host, api_key: apiKey },
  } = functions.config();

  return `${host}/projects/${apiKey}`;
};

export const getCopyTunerUrl = functions.region('asia-northeast1').https.onCall(async () => {
  return await getUrl();
});
