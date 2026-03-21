import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { Role } from '@prisma/client';

export const createStudent = async (req: Request, res: Response) => {
  const { email, password, schoolId, sectionId, parentId } = req.body;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.STUDENT,
      schoolId,
      student: {
        create: {
          sectionId,
          parentId
        }
      }
    },
    include: { student: true }
  });

  res.status(201).json({ success: true, data: user });
};

export const getStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany({
    include: {
      user: { select: { id: true, email: true, schoolId: true } },
      section: true,
      parent: { include: { user: { select: { email: true } } } }
    }
  });
  res.status(200).json({ success: true, data: students });
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sectionId, parentId } = req.body;

  const student = await prisma.student.update({
    where: { id },
    data: { sectionId, parentId }
  });

  res.status(200).json({ success: true, data: student });
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

  await prisma.student.delete({ where: { id } });
  await prisma.user.delete({ where: { id: student.userId } });

  res.status(200).json({ success: true, message: 'Student deleted successfully' });
};
