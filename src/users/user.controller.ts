import { Request, Response } from 'express';
import { CognitoAuthService } from './auth.service';

const cognito = new CognitoAuthService();

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await cognito.register(email, password);

      return res.status(201).json({
        message: 'User registered in Cognito',
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message, error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await cognito.login(email, password);

      return res.json({
        message: 'Login successful',
        idToken: result.AuthenticationResult?.IdToken,
        accessToken: result.AuthenticationResult?.AccessToken,
      });
    } catch (err) {
      return res.status(401).json({ message: 'Login failed', error: err });
    }
  }

  static async profile(req: Request, res: Response) {
    return res.json({
      message: 'Profile data',
      user: (req as any).user,
    });
  }
}
