import * as functions from 'firebase-functions';
import { Storage } from '@google-cloud/storage';

export const getCacheUrl = async ({
  locale,
  cacheBucketName,
  cacheFolder,
}: {
  locale: string;
  cacheBucketName;
  cacheFolder;
}): Promise<{ url: string }> => {
  const {
    copy_tuner: { environment },
  } = functions.config();
  const storage = new Storage();
  const fileName =
    environment === 'staging'
      ? `${cacheFolder}/draft/${locale}`
      : `${cacheFolder}/publish/${locale}`;
  const [url] = await storage
    .bucket(cacheBucketName)
    .file(fileName)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 24,
    });

  return { url };
};

// TODO: 設定ファイルで変更できるようにする
const region = 'asia-northeast1';
const cacheBucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`;
const cacheFolder = 'copy-tuner';

export const getCopyTunerCacheUrl = functions
  .region(region)
  .https.onCall(async ({ locale }: { locale: string }) => {
    return await getCacheUrl({ locale, cacheBucketName, cacheFolder });
  });
