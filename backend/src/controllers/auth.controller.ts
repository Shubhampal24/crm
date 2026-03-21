import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { email, password, role, schoolId } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      schoolId
    }
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { id: user.id, email: user.email, role: user.role }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const payload = { userId: user.id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.status(200).json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken
    }
  });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const payload = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const newAccessToken = generateAccessToken({ userId: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    res.status(200).json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};
