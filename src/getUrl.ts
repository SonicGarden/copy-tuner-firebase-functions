import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<{ url: string }> => {
  const {
    copy_tuner: { host, api_key: apiKey, environment },
  } = functions.config();
  const url = environment === 'staging' ? `${host}/projects/${apiKey}` : '';

  return { url };
};

// TODO: 設定ファイルで変更できるようにする
const region = 'asia-northeast1';

export const getCopyTunerUrl = functions.region(region).https.onCall(async () => {
  return await getUrl();
});
