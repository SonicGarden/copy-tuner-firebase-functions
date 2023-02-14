import { tmpdir } from 'os';
import { writeFile } from 'fs/promises';
import { Storage } from '@google-cloud/storage';
import { env } from './lib/env';
import { functions } from './lib/firebase';
import { fetchBlurbs } from './fetchBlurbs';

export const cacheBlurbs = async (data: {
  locale: string;
  cacheBucketName: string;
  cacheFolder: string;
}): Promise<boolean> => {
  const { locale, cacheBucketName, cacheFolder } = data;
  const environment = env('ENVIRONMENT');
  const cacheFile = `${tmpdir()}/${locale}.json`;
  const { blurbs } = await fetchBlurbs({ locale });
  const storage = new Storage();
  const destination =
    environment === 'staging'
      ? `${cacheFolder}/draft/${locale}`
      : `${cacheFolder}/publish/${locale}`;

  await writeFile(cacheFile, JSON.stringify(blurbs));
  await storage.bucket(cacheBucketName).upload(cacheFile, { destination });
  return true;
};

// TODO: 設定ファイルで変更できるようにする
const schedule = 'every 10 minutes';
const timeZone = 'Asia/Tokyo';
const cacheBucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`;
const cacheFolder = 'copy-tuner';

export const cacheCopyTunerBlurbs = functions()
  .pubsub.schedule(schedule)
  .timeZone(timeZone)
  .onRun(async () => {
    try {
      const locales = env('LOCALES');
      await Promise.all(
        locales.map((locale) => cacheBlurbs({ locale, cacheBucketName, cacheFolder }))
      );
      console.info('copy-tuner blurbs cached successfully.');
    } catch (error) {
      console.error(error);
    }
  });
