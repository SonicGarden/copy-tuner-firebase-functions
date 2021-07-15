import * as functions from 'firebase-functions';
import { fetchPublishedBlurbs, fetchDraftBlurbs } from './lib/copyTuner';
import { CopyTunerBlurbs, CopyTunerBlurbsByLocale } from './types';

export const fetchBlurbs = async (data: {
  locale?: string;
}): Promise<{ blurbs: CopyTunerBlurbs | CopyTunerBlurbsByLocale }> => {
  const { locale } = data;
  const {
    copy_tuner: { s3_host: host, api_key: apiKey, environment },
  } = functions.config();
  const blurbs =
    environment === 'staging'
      ? await fetchDraftBlurbs({ host, apiKey, locale })
      : await fetchPublishedBlurbs({ host, apiKey, locale });

  return { blurbs };
};

export const fetchCopyTunerBlurbs = functions.region('asia-northeast1').https.onCall(async (data) => {
  return await fetchBlurbs(data);
});
