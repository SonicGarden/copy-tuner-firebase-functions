import { Storage } from '@google-cloud/storage';
import { env } from './lib/env';
import { functions } from './lib/firebase';
import type { CopyTunerBlurbsByLocale } from './types';

export const fetchCacheBlurbs = async ({
  locale,
  cacheBucketName,
  cacheFolder,
}: {
  locale: string;
  cacheBucketName;
  cacheFolder;
}): Promise<{ blurbs: CopyTunerBlurbsByLocale }> => {
  const environment = env('ENVIRONMENT');
  const storage = new Storage();
  const fileName =
    environment === 'staging'
      ? `${cacheFolder}/draft/${locale}`
      : `${cacheFolder}/publish/${locale}`;
  const contents = await storage.bucket(cacheBucketName).file(fileName).download();
  const blurbs = JSON.parse(contents.toString());

  return { blurbs };
};

// TODO: 設定ファイルで変更できるようにする
const cacheBucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`;
const cacheFolder = 'copy-tuner';

export const fetchCopyTunerCacheBlurbs = functions().https.onCall(
  async ({ locale }: { locale: string }) => {
    return await fetchCacheBlurbs({ locale, cacheBucketName, cacheFolder });
  }
);
