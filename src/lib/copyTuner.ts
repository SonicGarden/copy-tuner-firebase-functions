import axios from 'axios';
import { CopyTunerBlurbs } from '../types';

const blurbsByLocale = ({ data, locale }) => {
  // eslint-disable-next-line no-useless-escape
  const regExp = new RegExp(`^${locale}\.`);

  return Object.entries(data)
    .filter(([key]) => regExp.test(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key.replace(`${locale}.`, '')]: value }), {});
};

const blurbs = ({ data }) => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const [locale, ...keys] = key.split('.');
    acc[locale] = { ...acc[locale], [keys.join('.')]: value };
    return acc;
  }, {});
};

type fetchBlurbsOptions = {
  host: string;
  apiKey: string;
  locale?: string;
};

export const fetchPublishedBlurbs = async ({ host, apiKey, locale }: fetchBlurbsOptions): Promise<CopyTunerBlurbs> => {
  const url = `${host}/api/v2/projects/${apiKey}/published_blurbs.json`;
  const { data } = await axios.get(url);

  return locale ? blurbsByLocale({ data, locale }) : blurbs({ data });
};

export const fetchDraftBlurbs = async ({ host, apiKey, locale }: fetchBlurbsOptions): Promise<CopyTunerBlurbs> => {
  const url = `${host}/api/v2/projects/${apiKey}/draft_blurbs.json`;
  const { data } = await axios.get(url);

  return locale ? blurbsByLocale({ data, locale }) : blurbs({ data });
};
