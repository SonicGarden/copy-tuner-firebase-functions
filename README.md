# copy-tuner-firebase-functions

CopyTuner Helpers for Firebase Cloud Functions

# Installation

```
yarn add @sonicgarden/copy-tuner-firebase-functions
```

# Usage

## When deploying to region asia-northeast1

In functions/index.js

```
export * from '@sonicgarden/copy-tuner-firebase-functions';
```

## When custom deploying

In functions/index.js

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
