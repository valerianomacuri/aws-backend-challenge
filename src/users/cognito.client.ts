import {
  CognitoIdentityProviderClient,
  CreateUserPoolCommand,
  DescribeUserPoolCommand,
  CreateUserPoolClientCommandInput,
  CreateUserPoolClientCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { envs } from '../config/envs';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: envs.awsRegion,
  endpoint: envs.cognitoEndpoint,
  credentials: {
    accessKeyId: envs.awsAccessKey,
    secretAccessKey: envs.awsSecretKey,
  },
});

async function initializeLocalCognito(): Promise<{
  userPoolId: string;
  clientId: string;
}> {
  // 1. Crear o verificar User Pool
  const userPoolId = await createOrGetUserPool();

  // 2. Crear User Pool Client
  const clientParams: CreateUserPoolClientCommandInput = {
    UserPoolId: userPoolId,
    ClientName: 'local-app-client',
    GenerateSecret: false, // false para apps públicas (web/mobile)
    ExplicitAuthFlows: [
      'ALLOW_USER_PASSWORD_AUTH', // Login con usuario/contraseña
      'ALLOW_REFRESH_TOKEN_AUTH', // Renovar tokens
    ],
    RefreshTokenValidity: 30, // días
    AccessTokenValidity: 60, // minutos
    IdTokenValidity: 60, // minutos
    PreventUserExistenceErrors: 'ENABLED',
  };

  const response = await cognitoClient.send(
    new CreateUserPoolClientCommand(clientParams),
  );

  const clientId = response.UserPoolClient?.ClientId || '';

  console.log('Client ID created:', clientId);

  return { userPoolId, clientId };
}

async function createOrGetUserPool(): Promise<string> {
  try {
    const response = await cognitoClient.send(
      new DescribeUserPoolCommand({ UserPoolId: 'local-pool' }),
    );
    return response.UserPool?.Id || 'local-pool';
  } catch (error) {
    if (error instanceof Error && error.name === 'ResourceNotFoundException') {
      const createResponse = await cognitoClient.send(
        new CreateUserPoolCommand({
          PoolName: 'local-pool',
          AutoVerifiedAttributes: ['email'],
          UsernameAttributes: ['email'],
        }),
      );
      return createResponse.UserPool?.Id || 'local-pool';
    }
    throw error;
  }
}

// Ejecutar al inicio de la app
export async function setupLocalCognito() {
  const { userPoolId, clientId } = await initializeLocalCognito();

  // Guardar en variables de entorno en tiempo de ejecución
  process.env.COGNITO_USER_POOL_ID = userPoolId;
  process.env.COGNITO_CLIENT_ID = clientId;

  console.log('✅ Local Cognito initialized');
  console.log('User Pool ID:', userPoolId);
  console.log('Client ID:', clientId);
}
