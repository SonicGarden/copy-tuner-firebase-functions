import * as functions from 'firebase-functions';
import { tmpdir } from 'os';
import { writeFile } from 'fs/promises';
import { Storage } from '@google-cloud/storage';
import { fetchBlurbs } from './fetchBlurbs';

export const cacheBlurbs = async (data: {
  locale: string;
  cacheBucketName: string;
  cacheFolder: string;
}): Promise<boolean> => {
  const { locale, cacheBucketName, cacheFolder } = data;
  const cacheFile = `${tmpdir()}/${locale}.json`;
  const { blurbs } = await fetchBlurbs({ locale });
  const storage = new Storage();

  await writeFile(cacheFile, JSON.stringify(blurbs));
  await storage.bucket(cacheBucketName).upload(cacheFile, {
    destination: `${cacheFolder}/${locale}`,
  });
  return true;
};

const defaultOptions = {
  region: 'asia-northeast1',
  schedule: '0 0 * * *',
  timeZone: 'Asia/Tokyo',
  locales: ['ja'],
  cacheBucketName: `${JSON.parse(process.env.FIREBASE_CONFIG).storageBucket}`,
  cacheFolder: 'copy-tuner',
};

export const cacheCopyTunerBlurbs = (
  options: {
    region?: string;
    schedule?: string;
    timeZone?: string;
    locales?: string[];
    cacheBucketName?: string;
    cacheFolder?: string;
  } = defaultOptions
): functions.CloudFunction<unknown> => {
  const { region, schedule, timeZone, locales, cacheBucketName, cacheFolder } = {
    ...defaultOptions,
    ...options,
  };

  return functions
    .region(region)
    .pubsub.schedule(schedule)
    .timeZone(timeZone)
    .onRun(async () => {
      try {
        await Promise.all(
          locales.map((locale) => cacheBlurbs({ locale, cacheBucketName, cacheFolder }))
        );
        console.info('copy-tuner blurbs cached successfully.');
      } catch (error) {
        console.error(error);
      }
    });
};
