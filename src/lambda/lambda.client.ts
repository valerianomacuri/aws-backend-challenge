import { LambdaClient } from '@aws-sdk/client-lambda';
import { envs } from '../config/envs';

export const lambdaClient = new LambdaClient({
  region: envs.awsRegion,
  endpoint: envs.lambdaEndpoint,
  credentials: {
    accessKeyId: envs.awsAccessKey,
    secretAccessKey: envs.awsSecretKey,
  },
});
