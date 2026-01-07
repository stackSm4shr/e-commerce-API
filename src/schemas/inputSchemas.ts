import { z } from "zod";

export const userInputSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),

    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),
  })
  .strict();

export const authLoginSchema = z
  .object({
    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),
    password: z
      .string({ error: "password must be a string" })
      .min(1, { message: "password is required" }),
  })
  .strict();

export const authRegisterSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),

    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),

    password: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(64, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "current password is required" }),
    newPassword: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(64, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
    confirmNewPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "confirm new password is required" }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "passwords must match",
  })
  .strict();

export const productInputSchema = z
  .object({
    title: z
      .string({ error: "title must be a string" })
      .min(4, { message: "title must be at least 4 characters long" }),

    description: z
      .string({ error: "Description must be a string" })
      .min(4, { message: "Description must be at least 4 characters long" }),

    category: z
      .string({ error: "Category must be a string" })
      .min(4, { message: "Description must be at least 4 characters long" }),

    price: z.coerce.number({ error: "Price must be a number" }),

    quantity: z.coerce.number({ error: "Quantity must be a number" }),

    image_url: z.array(z.url()).optional(),
  })
  .strict();

export const categoryInputSchema = z
  .object({
    category: z
      .string({ error: "Category must be a string" })
      .min(4, { message: "Category must be at least 4 characters long" }),
  })
  .strict();

export const orderInputSchema = z.object({
  products: z
    .array(
      z.object({
        productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "Order must contain at least one product"),
});
