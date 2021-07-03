import * as functions from 'firebase-functions';

export const getConfig = async (): Promise<{ [key: string]: string }> => {
  try {
    const { copy_tuner: copyTuner } = functions.config();

    return copyTuner;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getCopyTunerConfig = functions.region('asia-northeast1').https.onCall(async () => {
  return await getConfig();
});
