import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import { envs } from '../config/envs';

let JWKS_CACHE: any = null;

/**
 * Obtiene y cachea los JWKS desde Cognito Local
 */
async function getJwks() {
  if (!JWKS_CACHE) {
    const res = await axios.get(
      `${envs.cognitoEndpoint}/${envs.cognitoUserPoolId}/.well-known/jwks.json`,
    );
    JWKS_CACHE = res.data;
  }
  return JWKS_CACHE;
}

/**
 * Middleware de autenticación usando JWT de Cognito Local
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }

    const token = auth.replace('Bearer ', '');

    // Decodificar token sin validar para obtener el "kid"
    const decoded = jwt.decode(token, { complete: true }) as any;

    if (!decoded || !decoded.header) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const kid = decoded.header.kid;

    // Obtener JWKS
    const jwks = await getJwks();

    const jwk = jwks.keys.find((k: any) => k.kid === kid);

    if (!jwk) {
      return res.status(401).json({ message: 'Invalid token (kid not found)' });
    }

    const pem = jwkToPem(jwk);

    // Verificar token
    const verified = jwt.verify(token, pem);

    // Guardar usuario en req.user
    (req as any).user = verified;

    return next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
