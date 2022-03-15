import * as functions from 'firebase-functions';
import { Storage } from '@google-cloud/storage';
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
  const {
    copy_tuner: { environment },
  } = functions.config();
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
const region = 'asia-northeast1';
const cacheBucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`;
const cacheFolder = 'copy-tuner';

export const fetchCopyTunerCacheBlurbs = functions
  .region(region)
  .https.onCall(async ({ locale }: { locale: string }) => {
    return await fetchCacheBlurbs({ locale, cacheBucketName, cacheFolder });
  });
