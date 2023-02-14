import { fetchPublishedBlurbs, fetchDraftBlurbs } from './lib/copyTuner';
import { functions } from './lib/firebase';
import { env } from './lib/env';
import type { CopyTunerBlurbs, CopyTunerBlurbsByLocale } from './types';

export const fetchBlurbs = async (data: {
  locale?: string;
}): Promise<{ blurbs: CopyTunerBlurbs | CopyTunerBlurbsByLocale }> => {
  const { locale } = data;
  const environment = env('ENVIRONMENT');
  const host = env('S3_HOST');
  const apiKey = env('API_KEY');
  const blurbs =
    environment === 'staging'
      ? await fetchDraftBlurbs({ host, apiKey, locale })
      : await fetchPublishedBlurbs({ host, apiKey, locale });

  return { blurbs };
};

export const fetchCopyTunerBlurbs = functions().https.onCall(async (data) => {
  return await fetchBlurbs(data);
});
