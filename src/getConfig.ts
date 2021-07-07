import * as functions from 'firebase-functions';
import { CopyTunerConfig } from './types';

export const getConfig = async (): Promise<CopyTunerConfig> => {
  const { copy_tuner: copyTuner } = functions.config();

  return copyTuner;
};

export const getCopyTunerConfig = functions.region('asia-northeast1').https.onCall(async () => {
  return await getConfig();
});
