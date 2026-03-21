import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface TokenPayload {
  userId: string;
  role: Role;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
};
