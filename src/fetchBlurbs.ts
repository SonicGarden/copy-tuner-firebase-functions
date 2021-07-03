import * as functions from 'firebase-functions';
import { fetchPublishedBlurbs, fetchDraftBlurbs, fetchBlurbsReturn } from './lib/copyTuner';

type Data = {
  locale: string;
  environment: string;
};

export const fetchBlurbs = async (data: Data): fetchBlurbsReturn => {
  try {
    const { locale, environment } = data;
    const {
      copy_tuner: { s3_host: host, api_key: apiKey },
    } = functions.config();

    const blurbs =
      environment === 'production'
        ? await fetchPublishedBlurbs({ host, apiKey, locale })
        : await fetchDraftBlurbs({ host, apiKey, locale });
    return blurbs;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchCopyTunerBlurbs = functions.region('asia-northeast1').https.onCall(async (data) => {
  return await fetchBlurbs(data);
});
