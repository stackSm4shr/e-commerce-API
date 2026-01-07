import type { RequestHandler } from "express";
import { Product } from "#models";
import { z } from "zod";
import type { productInputSchema } from "#schemas";

type ProductInputDTO = z.infer<typeof productInputSchema>;

/* ---------- CREATE ---------- */
// URL - RESPONSE SHAPE & REQUEST BODY
// prettier-ignore
export const createProduct: RequestHandler<
unknown,
any,
ProductInputDTO> = async (
  req,
  res
) => {
  const userId = req.user?.id;
  
  const { title, description,category, price, quantity } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];
  const imageUrl = files.map((f) => f.path);

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    category,

    user: userId,
    image_url: imageUrl,
  });

  // console.log('cloudinary upload results', files);
  res.status(201).json(newProduct);
};

/* ---------- READ ALL ---------- */
export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await Product.find().populate(
    "user",
    "firstName lastName email"
  );

  if (!products.length) {
    throw new Error("No Products found", { cause: { status: 404 } });
  }
  res.status(200).json(products);
};

/* ---------- READ ONE ---------- */
export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate(
    "user",
    "firstName lastName"
  );

  if (!product) {
    throw new Error("Product not found", { cause: { status: 404 } });
  }
  res.status(200).json(product);
};

/* ---------- UPDATE  ---------- */
// prettier-ignore
export const updateProduct: RequestHandler<
  { id: string },
  any,
  ProductInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price,
    quantity } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];

  const imageUrl = files.map((f) => f.path);

  const updateData: any = { title, description, category, price,
  quantity };

  if (imageUrl.length > 0) {
    updateData.image_url = imageUrl;
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate('user', 'firstName lastName');

  if (!updatedProduct) {
    throw new Error('Product not found', { cause: { status: 404 } });
  }

  res.status(200).json({
    message: 'Product updated successfully',
    product: updatedProduct,
  });
};

/* ---------- DELETE ---------- */
export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error("Product not found", { cause: { status: 404 } });
  }

  res.status(200).json({
    message: `Product with id:${id} was deleted`,
  });
};
