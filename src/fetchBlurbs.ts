import * as functions from 'firebase-functions';
import { fetchPublishedBlurbs, fetchDraftBlurbs } from './lib/copyTuner';
import type { CopyTunerBlurbs, CopyTunerBlurbsByLocale } from './types';

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

// TODO: 設定ファイルで変更できるようにする
const region = 'asia-northeast1';

export const fetchCopyTunerBlurbs = functions.region(region).https.onCall(async (data) => {
  return await fetchBlurbs(data);
});
