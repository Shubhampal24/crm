import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { Role } from '@prisma/client';

export const createStaff = async (req: Request, res: Response) => {
  const { email, password, schoolId } = req.body;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.STAFF,
      schoolId,
      staff: {
        create: {}
      }
    },
    include: { staff: true }
  });

  res.status(201).json({ success: true, data: user });
};

export const assignSubjects = async (req: Request, res: Response) => {
  const { id } = req.params; // Staff ID
  const { subjectIds } = req.body;

  const staff = await prisma.staff.update({
    where: { id },
    data: {
      subjects: {
        connect: subjectIds.map((subId: string) => ({ id: subId }))
      }
    },
    include: { subjects: true }
  });

  res.status(200).json({ success: true, data: staff });
};

export const getStaffList = async (req: Request, res: Response) => {
  const staffList = await prisma.staff.findMany({
    include: {
      user: { select: { id: true, email: true, schoolId: true } },
      subjects: true
    }
  });
  res.status(200).json({ success: true, data: staffList });
};
