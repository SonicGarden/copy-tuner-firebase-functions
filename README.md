# copy-tuner-firebase-functions

CopyTuner Helpers for Firebase Cloud Functions

# Installation

```
yarn add @sonicgarden/copy-tuner-firebase-functions
```

# Usage

## Set environment configuration

```
firebase functions:config:set copy_tuner.host="xxx" copy_tuner.s3_host="xxx" copy_tuner.api_key="xxx"
```

## Create functions

In functions/index.js (When deploying to region asia-northeast1)

```
export * from '@sonicgarden/copy-tuner-firebase-functions';
```

or

In functions/index.js (When custom deploying)

```
export const fetchCopyTunerBlurbs = functions.https.onCall(async (data) => {
  const { fetchCopyTunerBlurbs } = await import('@sonicgarden/copy-tuner-firebase-functions/core');
  return await fetchCopyTunerBlurbs(data);
});

export const getCopyTunerConfig = functions.https.onCall(async () => {
  const { getCopyTunerConfig } = await import('@sonicgarden/copy-tuner-firebase-functions/core');
  return await getCopyTunerConfig();
});
```

## Fetch blurbs

```
const fetchCopyTunerBlurbs = firebase.functions().httpsCallable('fetchCopyTunerBlurbs');

fetchCopyTunerBlurbs({ environment: 'production', locale: 'ja' }).then(({ data }) => console.log(data));
```
