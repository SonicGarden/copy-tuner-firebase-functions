import * as functions from 'firebase-functions';
import { fetchPublishedBlurbs, fetchDraftBlurbs } from './lib/copyTuner';
import { CopyTunerBlurbs } from './types';

export const fetchBlurbs = async (data: { locale: string; environment: string }): Promise<CopyTunerBlurbs> => {
  const { locale, environment } = data;
  const {
    copy_tuner: { s3_host: host, api_key: apiKey },
  } = functions.config();

  const blurbs =
    environment === 'production'
      ? await fetchPublishedBlurbs({ host, apiKey, locale })
      : await fetchDraftBlurbs({ host, apiKey, locale });
  return blurbs;
};

export const fetchCopyTunerBlurbs = functions.region('asia-northeast1').https.onCall(async (data) => {
  return await fetchBlurbs(data);
});
