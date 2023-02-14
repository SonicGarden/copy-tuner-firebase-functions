import { functions } from './lib/firebase';
import { getUrl } from './getUrl';
import { fetchBlurbs } from './fetchBlurbs';
import type { CopyTunerBlurbsByLocale } from './types';

export const getProps = async ({
  locale,
}: {
  locale: string;
}): Promise<{ locale: string; blurbs: CopyTunerBlurbsByLocale; url: string }> => {
  const { url } = await getUrl();
  const { blurbs } = (await fetchBlurbs({ locale })) as { blurbs: CopyTunerBlurbsByLocale };

  return { locale, blurbs, url };
};

export const getCopyTunerProps = functions().https.onCall(
  async ({ locale }: { locale: string }) => {
    return await getProps({ locale });
  }
);
