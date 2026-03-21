import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { Role } from '@prisma/client';

export const createParent = async (req: Request, res: Response) => {
  const { email, password, schoolId } = req.body;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.PARENT,
      schoolId,
      parent: {
        create: {}
      }
    },
    include: { parent: true }
  });

  res.status(201).json({ success: true, data: user });
};

export const linkChild = async (req: Request, res: Response) => {
  const { id } = req.params; // Parent ID
  const { studentId } = req.body;

  const parent = await prisma.parent.update({
    where: { id },
    data: {
      students: {
        connect: { id: studentId }
      }
    },
    include: { students: true }
  });

  res.status(200).json({ success: true, data: parent });
};
