import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const createClass = async (req: Request, res: Response) => {
  const { name, schoolId } = req.body;
  
  const newClass = await prisma.class.create({
    data: { name, schoolId }
  });

  res.status(201).json({ success: true, data: newClass });
};

export const assignStudents = async (req: Request, res: Response) => {
  const { sectionId, studentIds } = req.body;
  
  const updateStudents = await prisma.student.updateMany({
    where: { id: { in: studentIds } },
    data: { sectionId }
  });

  res.status(200).json({ success: true, message: `${updateStudents.count} students assigned to section` });
};

export const createSubjectAndAssignTeacher = async (req: Request, res: Response) => {
  const { name, sectionId, staffId } = req.body;
  
  const subject = await prisma.subject.create({
    data: {
      name,
      sectionId,
      staffId
    }
  });

  res.status(201).json({ success: true, data: subject });
};
