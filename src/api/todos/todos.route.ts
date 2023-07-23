import { Router } from 'express';
import * as TodoHandlers from './todos.handlers';

import { validateRequest } from '../../middlewares';

import { Todo } from './todos.model';
// import { ZodError, AnyZodObject } from 'zod';

const router = Router();

// interface RequestValidators {
//   params?: AnyZodObject;
//   body?: AnyZodObject;
//   query?: AnyZodObject;
// }

// function validateRequest(validators: RequestValidators) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (validators.params) {
//         req.body = validators.params.parseAsync(req.params);
//       }
//       if (validators.body) {
//         req.body = validators.body.parseAsync(req.body);
//       }
//       if (validators.query) {
//         req.body = validators.query.parseAsync(req.query);
//       }
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         res.status(422);
//       }
//       next(error);
//     }
//   };
// }

router.get('/', TodoHandlers.findAll);
router.post(
  '/',
  validateRequest({
    body: Todo,
  }),
  TodoHandlers.createOne
);

export default router;
