import { Router } from 'express';

import * as TodoHandlers from './todos.handlers';
import { validateRequest } from '../../middlewares';
import { Todo } from './todos.model';

const router = Router();

router.get('/', TodoHandlers.findAll);
router.post(
  '/',
  validateRequest({
    body: Todo,
  }),
  TodoHandlers.createOne
);

export default router;
