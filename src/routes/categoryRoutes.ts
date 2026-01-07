import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '#controllers';
import { authenticate, authorizeAdmin, validateBodyZod } from '#middlewares';
import { categoryInputSchema } from '#schemas';

const categoryRoutes = Router();

/* ---------- PUBLIC ---------- */
categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id', getCategoryById);

/* ---------- CREATE---------- */
categoryRoutes.post(
  '/',
  authenticate,
  authorizeAdmin,
  validateBodyZod(categoryInputSchema),
  createCategory
);

/* ---------- UPDATE---------- */
categoryRoutes.put(
  '/:id',
  authenticate,
  authorizeAdmin,
  validateBodyZod(categoryInputSchema),
  updateCategory
);

/* ---------- DELETE---------- */
categoryRoutes.delete('/:id', authenticate, authorizeAdmin, deleteCategory);

export default categoryRoutes;
