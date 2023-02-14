import { functions } from './lib/firebase';
import { getUrl } from './getUrl';
import { fetchCacheBlurbs } from './fetchCacheBlurbs';
import type { CopyTunerBlurbsByLocale } from './types';

export const getProps = async ({
  locale,
  cacheBucketName,
  cacheFolder,
}: {
  locale: string;
  cacheBucketName;
  cacheFolder;
}): Promise<{ locale: string; blurbs: CopyTunerBlurbsByLocale; url: string }> => {
  const { url } = await getUrl();
  const { blurbs } = await fetchCacheBlurbs({ locale, cacheBucketName, cacheFolder });

  return { locale, blurbs, url };
};

// TODO: 設定ファイルで変更できるようにする
const cacheBucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`;
const cacheFolder = 'copy-tuner';

export const getCopyTunerProps = functions().https.onCall(
  async ({ locale }: { locale: string }) => {
    return await getProps({ locale, cacheBucketName, cacheFolder });
  }
);
