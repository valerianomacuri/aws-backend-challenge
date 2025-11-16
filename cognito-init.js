const dotenv = require('dotenv');
const {
  CognitoIdentityProviderClient,
  CreateUserPoolCommand,
  CreateUserPoolClientCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

dotenv.config();

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.COGNITO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function setup() {
  // Create User Pool
  const poolRes = await client.send(
    new CreateUserPoolCommand({
      PoolName: 'local-pool',
    }),
  );

  const poolId = poolRes.UserPool.Id;
  console.log('Pool ID:', poolId);

  // Create App Client
  const clientRes = await client.send(
    new CreateUserPoolClientCommand({
      UserPoolId: poolId,
      ClientName: 'local-client',
      GenerateSecret: false,
      ExplicitAuthFlows: [
        'ALLOW_USER_PASSWORD_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH',
      ],
      AccessTokenValidity: 60,
      IdTokenValidity: 60,
      RefreshTokenValidity: 30,
      TokenValidityUnits: {
        AccessToken: 'minutes',
        IdToken: 'minutes',
        RefreshToken: 'days',
      },
    }),
  );

  const clientId = clientRes.UserPoolClient.ClientId;
  console.log('Client ID:', clientId);

  // Create test user
  await client.send(
    new AdminCreateUserCommand({
      UserPoolId: poolId,
      Username: 'test@example.com',
      UserAttributes: [
        { Name: 'email', Value: 'test@example.com' },
        { Name: 'email_verified', Value: 'true' },
      ],
      TemporaryPassword: 'Test1234',
      MessageAction: 'SUPPRESS',
    }),
  );

  await client.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: poolId,
      Username: 'test@example.com',
      Password: 'Test1234',
      Permanent: true,
    }),
  );

  console.log('User created: test@example.com / Test1234');

  return { poolId, clientId };
}

setup().catch(console.error);
