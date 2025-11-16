import dynamoose from 'dynamoose';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { envs } from '../config/envs';

// Cliente AWS personalizado (LocalStack o AWS real)
const dynamoDBClient = new DynamoDB({
  region: envs.awsRegion,
  endpoint: envs.dynamodbEndpoint,
  credentials: {
    accessKeyId: envs.awsAccessKey,
    secretAccessKey: envs.awsSecretKey,
  },
});

// Auto create/update tables (correcto para Dynamoose v3)
dynamoose.Table.defaults.set({
  create: true,
  update: true,
  waitForActive: {
    enabled: true,
  },
});

// Usar el cliente dentro de Dynamoose
dynamoose.aws.ddb.set(dynamoDBClient);

// 🔥 Logging correcto en Dynamoose 3.x
dynamoose.logger().then((logger) => {
  logger.providers.set(console);
});

export default dynamoose;
