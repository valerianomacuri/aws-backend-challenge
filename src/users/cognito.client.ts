import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { envs } from '../config/envs';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: envs.awsRegion,
  endpoint: envs.cognitoEndpoint,
  credentials: {
    accessKeyId: envs.awsAccessKey,
    secretAccessKey: envs.awsSecretKey,
  },
});
