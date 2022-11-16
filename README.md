# copy-tuner-firebase-functions

CopyTuner Helpers for Firebase Cloud Functions

# Installation

```
yarn add @sonicgarden/copy-tuner-firebase-functions
```

If you installed firebase-functions older than 4.0.0, you must install older than 2.0.0.

# Usage

Set environment configuration:

- staging

```
firebase functions:config:set copy_tuner.environment="staging"
firebase functions:config:set copy_tuner.host="xxx"
firebase functions:config:set copy_tuner.s3_host="xxx"
firebase functions:config:set copy_tuner.api_key="xxx"
```

- production　(Don't set copy_tuner.host)

```
firebase functions:config:set copy_tuner.environment="production"
firebase functions:config:set copy_tuner.s3_host="xxx"
firebase functions:config:set copy_tuner.api_key="xxx"
```

Create functions in functions/index.js:

When deploying to region asia-northeast1

```
export * from '@sonicgarden/copy-tuner-firebase-functions';
```

or

When custom deploying

```
export const fetchCopyTunerBlurbs = functions.https.onCall(async (data) => {
  const { fetchCopyTunerBlurbs } = await import('@sonicgarden/copy-tuner-firebase-functions/core');
  return await fetchCopyTunerBlurbs(data);
});

export const getCopyTunerUrl = functions.https.onCall(async () => {
  const { getCopyTunerUrl } = await import('@sonicgarden/copy-tuner-firebase-functions/core');
  return await getCopyTunerUrl();
});
```

Fetch blurbs:

```
const fetchCopyTunerBlurbs = firebase.functions().httpsCallable('fetchCopyTunerBlurbs');

fetchCopyTunerBlurbs({ locale: 'ja' }).then(({ data: { blurbs } }) => console.log(blurbs));
```
