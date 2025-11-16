import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { envs } from '../config/envs';
import { cognitoClient } from './cognito.client';

export class CognitoAuthService {
  async register(email: string, password: string) {
    const createUserCmd = new AdminCreateUserCommand({
      UserPoolId: envs.cognitoUserPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
      ],
      MessageAction: 'SUPPRESS',
    });

    await cognitoClient.send(createUserCmd);

    const setPasswordCmd = new AdminSetUserPasswordCommand({
      UserPoolId: envs.cognitoUserPoolId,
      Username: email,
      Password: password,
      Permanent: true,
    });

    return await cognitoClient.send(setPasswordCmd);
  }

  async login(email: string, password: string) {
    // 👈 Usar InitiateAuth (NO Admin)
    const cmd = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: envs.cognitoClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    return await cognitoClient.send(cmd);
  }
}
