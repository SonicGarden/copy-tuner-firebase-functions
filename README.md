# copy-tuner-firebase-functions

CopyTuner Helpers for Firebase Cloud Functions

# Installation

```
yarn add @sonicgarden/copy-tuner-firebase-functions
```

# Usage

Set environment configuration:

- staging

```
firebase functions:config:set copy_tuner.environment="staging"
firebase functions:config:set copy_tuner.region="asia-northeast1"
firebase functions:config:set copy_tuner.host="xxx"
firebase functions:config:set copy_tuner.s3_host="xxx"
firebase functions:config:set copy_tuner.api_key="xxx"
firebase functions:config:set copy_tuner.locales="ja, en"
```

- production　(Don't set copy_tuner.host)

```
firebase functions:config:set copy_tuner.environment="production"
firebase functions:config:set copy_tuner.region="asia-northeast1"
firebase functions:config:set copy_tuner.s3_host="xxx"
firebase functions:config:set copy_tuner.api_key="xxx"
firebase functions:config:set copy_tuner.locales="ja, en"
```

When fetching directly from the s3 server

1. Create functions in functions/index.js:

```
import { getCopyTunerProps } from '@sonicgarden/copy-tuner-firebase-functions';
```

2. Fetch blurbs

```
import { getFunctions, httpsCallable } from 'firebase/functions';
const getCopyTunerProps = httpsCallable(getFunctions(), 'getCopyTunerProps');

const { locale, blurbs, url } = getCopyTunerProps({ locale: 'ja' });
```

or

When fetching from the cloud storage cache

1. Create functions in functions/index.js:

```
import { getCopyTunerCacheProps, cacheCopyTunerBlurbs } from '@sonicgarden/copy-tuner-firebase-functions';
```

2. Fetch blurbs

```
import { getFunctions, httpsCallable } from 'firebase/functions';
const getCopyTunerCacheProps = httpsCallable(getFunctions(), 'getCopyTunerCacheProps');

const { locale, blurbs, url } = getCopyTunerCacheProps({ locale: 'ja' });
```
