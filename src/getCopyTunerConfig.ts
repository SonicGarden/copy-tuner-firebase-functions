import * as functions from 'firebase-functions';

export const getCopyTunerConfig = async (): Promise<{ [key: string]: string }> => {
  try {
    const { copy_tuner: copyTuner } = functions.config();

    return copyTuner;
  } catch (error) {
    console.error(error);
    return {};
  }
};
