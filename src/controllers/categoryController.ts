import type { RequestHandler } from "express";
import { Category } from "#models";
import { z } from "zod";
import type { categoryInputSchema } from "#schemas";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;


/* ---------- CREATE ---------- */
// URL - RESPONSE SHAPE & REQUEST BODY
// prettier-ignore
export const createCategory: RequestHandler<
unknown,
any,
CategoryInputDTO> = async (
  req,
  res
) => {
  const userId = req.user?.id;
  
  const { category } = req.body;

  const newProduct = await Category.create({
    category,
  });

  res.status(201).json(newProduct);
};

/* ---------- READ ALL ---------- */
export const getAllCategories: RequestHandler = async (req, res) => {
  const categories = await Category.find()
  if (!categories.length) {
    throw new Error('No Categories found', { cause: { status: 404 } });
  }
  res.status(200).json(categories);
};

/* ---------- READ ONE ---------- */
export const getCategoryById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id)

  if (!category) {
    throw new Error('Category not found', { cause: { status: 404 } });
  }
  res.status(200).json(category);
};

/* ---------- UPDATE  ---------- */
// prettier-ignore
export const updateCategory: RequestHandler<
  { id: string },
  any,
  CategoryInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  const updateData: any = { category };

  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!updatedCategory) {
    throw new Error('Category not found', { cause: { status: 404 } });
  }

  res.status(200).json({
    message: 'Category updated successfully',
    product: updatedCategory,
  });
};

/* ---------- DELETE ---------- */
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new Error('Category not found', { cause: { status: 404 } });
  }

  res.status(200).json({
    message: `Category with id:${id} was deleted`,
  });
};
