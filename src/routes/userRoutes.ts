import { Router } from 'express';
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '#controllers';
import { authenticate, authorize, validateBodyZod } from '#middlewares';
import { changePasswordSchema, userInputSchema } from '#schemas';
import { User } from '#models';

const userRoutes = Router();

/* PUBLIC */
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);

userRoutes.put(
  '/:id',
  authenticate,
  authorize(User),
  validateBodyZod(userInputSchema),
  updateUser
);

userRoutes.patch(
  '/:id/password',
  authenticate,
  authorize(User),
  validateBodyZod(changePasswordSchema),
  changePassword
);

userRoutes.delete('/:id', authenticate, authorize(User), deleteUser);

export default userRoutes;
