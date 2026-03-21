import { Router } from 'express';
import { createParent, linkChild } from '../controllers/parent.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createParentSchema, linkChildSchema } from '../schemas/entities.schema';

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'PRINCIPAL']), validate(createParentSchema), createParent);
router.post('/:id/link-student', authorize(['ADMIN', 'PRINCIPAL']), validate(linkChildSchema), linkChild);

export default router;
