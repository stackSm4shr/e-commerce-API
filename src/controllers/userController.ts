import bcrypt from 'bcrypt';
import type { RequestHandler } from 'express';
import { User } from '#models';
import type { z } from 'zod';
import type { userInputSchema, changePasswordSchema } from '#schemas';

type UserInputDTO = z.infer<typeof userInputSchema>;
type UserDTO = UserInputDTO;
type ChangePasswordDTO = z.infer<typeof changePasswordSchema>;

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find().select('firstName lastName roles');

  if (!users.length) {
    throw new Error('No user was found', { cause: { status: 404 } });
  }

  res.json(users);
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found', { cause: { status: 404 } });
  }

  res.json(user);
};

// URL // RESPONSE SHAPE // REQUEST BODY => validation
export const updateUser: RequestHandler<
  { id: string },
  UserDTO,
  UserInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('User not found', { cause: { status: 404 } });
  }

  res.status(200).json(updatedUser);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new Error('User not found', { cause: { status: 404 } });
  }

  res.status(200).json({ message: 'User deleted successfully' });
};

export const changePassword: RequestHandler<
  { id: string },
  { message: string },
  ChangePasswordDTO
> = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(id).select('+password');

  if (!user) {
    throw new Error('User not found', { cause: { status: 404 } });
  }

  const ok = await bcrypt.compare(currentPassword, user.password);

  if (!ok) {
    throw new Error('password is incorrect', { cause: { status: 400 } });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  user.password = hash;
  await user.save();

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'password updated, relogin' });
};
