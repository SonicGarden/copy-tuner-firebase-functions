import * as functions from 'firebase-functions';
import { tmpdir } from 'os';
import { writeFile } from 'fs/promises';
import { Storage } from '@google-cloud/storage';
import { fetchBlurbs } from './fetchBlurbs';

export const cacheBlurbs = async (data: {
  locale: string;
  bucketName: string;
}): Promise<boolean> => {
  const { locale, bucketName } = data;
  const cacheFile = `${tmpdir()}/${locale}.json`;
  const { blurbs } = await fetchBlurbs({ locale });
  const storage = new Storage();

  await writeFile(cacheFile, JSON.stringify(blurbs));
  await storage.bucket(bucketName).upload(cacheFile, {
    destination: `copy-tuner/${locale}.json`,
  });
  return true;
};

export const cacheCopyTunerBlurbs = ({
  region = 'asia-northeast1',
  schedule = '0 0 * * *',
  timeZone = 'Asia/Tokyo',
  bucketName = `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`,
  locale = 'ja',
}: {
  region?: string;
  schedule?: string;
  timeZone?: string;
  bucketName?: string;
  locale?: string;
}): functions.CloudFunction<unknown> => {
  return functions
    .region(region)
    .pubsub.schedule(schedule)
    .timeZone(timeZone)
    .onRun(async () => {
      try {
        await cacheBlurbs({ locale, bucketName });
        console.info('copy-tuner blurbs cached successfully.');
      } catch (error) {
        console.error(error);
      }
    });
};
