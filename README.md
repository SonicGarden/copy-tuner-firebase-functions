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

Create functions in functions/index.js:

When fetching directly from the s3 server

```
import * as copyTuner from '@sonicgarden/copy-tuner-firebase-functions';

export getCopyTunerUrl = copyTuner.getCopyTunerUrl({
  region: 'asia-northeast1'
});
export fetchCopyTunerBlurbs = copyTuner.fetchCopyTunerBlurbs({
  region: 'asia-northeast1'
});
```

or

When fetching from the cloud storage cache

```
import * as copyTuner from '@sonicgarden/copy-tuner-firebase-functions';

export getCopyTunerUrl = copyTuner.getCopyTunerUrl({
  region: 'asia-northeast1'
});
export cacheCopyTunerBlurbs = copyTuner.cacheCopyTunerBlurbs({
  region: 'asia-northeast1',
  schedule: '0 0 * * *',
  timeZone: 'Asia/Tokyo'
});
```
