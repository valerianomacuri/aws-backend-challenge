import 'dotenv/config';
import env from 'env-var';

export const envs = {
  nodeEnv: env.get('NODE_ENV').required().asString(),

  port: env.get('PORT').required().asString(),

  awsRegion: env.get('AWS_REGION').required().asString(),
  awsAccessKey: env.get('AWS_ACCESS_KEY_ID').required().asString(),
  awsSecretKey: env.get('AWS_SECRET_ACCESS_KEY').required().asString(),

  // Endpoints LocalStack
  cognitoEndpoint: env.get('COGNITO_ENDPOINT').required().asString(),
  dynamodbEndpoint: env.get('DYNAMODB_ENDPOINT').required().asString(),
  s3Endpoint: env.get('S3_ENDPOINT').required().asString(),
  s3BucketName: env.get('S3_BUCKET_NAME').required().asString(),

  // Cognito
  cognitoUserPoolId: env.get('COGNITO_USER_POOL_ID').required().asString(),
  cognitoClientId: env.get('COGNITO_CLIENT_ID').required().asString(),

  // Lambda
  lambdaEndpoint: env.get('LAMBDA_ENDPOINT').required().asString(),

  postgresUrl: env.get('POSTGRES_URL').required().asString(),
};
