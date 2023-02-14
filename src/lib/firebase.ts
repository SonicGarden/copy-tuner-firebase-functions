import { runWith, RuntimeOptions, FunctionBuilder } from 'firebase-functions';
import { env } from './env';

export const functions = (runtimeOptions: RuntimeOptions = {}): FunctionBuilder =>
  runWith(runtimeOptions).region(env('REGION'));
