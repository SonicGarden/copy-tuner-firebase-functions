export type CopyTunerBlurbsByLocale = {
  [key: string]: string;
};

export type CopyTunerBlurbs = {
  [key: string]: CopyTunerBlurbsByLocale;
};

export type CopyTunerConfig = {
  host: string;
  s3_host: string;
  api_key: string;
};
