import * as functions from 'firebase-functions';

export const getConfig = async (): Promise<{ [key: string]: string }> => {
  const { copy_tuner: copyTuner } = functions.config();

  return copyTuner;
};

export const getCopyTunerConfig = functions.region('asia-northeast1').https.onCall(async () => {
  return await getConfig();
});
