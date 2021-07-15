import * as functions from 'firebase-functions';

export const getUrl = async (): Promise<string> => {
  const { copy_tuner: copyTuner } = functions.config();

  return `${copyTuner.host}/projects/${copyTuner.api_key}`;
};

export const getCopyTunerUrl = functions.region('asia-northeast1').https.onCall(async () => {
  return await getUrl();
});
