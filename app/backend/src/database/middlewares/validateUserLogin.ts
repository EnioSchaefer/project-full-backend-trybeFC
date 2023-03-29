import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';

export default function validateUserLogin(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(statusCodes.badRequest).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const emailValidation = emailRegex.test(email);

  if (!emailValidation) {
    return res.status(statusCodes.unauthorized).json({ message: 'Invalid email or password' });
  }

  if (password.length <= 6) {
    return res.status(statusCodes.unauthorized).json({ message: 'Invalid email or password' });
  }

  return next();
}
