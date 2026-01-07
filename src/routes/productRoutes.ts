import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "#controllers";
import {
  authenticate,
  authorizeAdmin,
  upload,
  validateBodyZod,
} from "#middlewares";
import { productInputSchema } from "#schemas";

const productRoutes = Router();

/* ---------- PUBLIC ---------- */
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);

/* ---------- CREATE---------- */
productRoutes.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.array("image", 5),
  validateBodyZod(productInputSchema),
  createProduct
);

/* ---------- UPDATE---------- */
productRoutes.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  upload.array("image", 5),
  validateBodyZod(productInputSchema),
  updateProduct
);

/* ---------- DELETE---------- */
productRoutes.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

export default productRoutes;
