import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import statusCodes from '../utils/statusCodes';

require('dotenv/config');

const secret = String(process.env.JWT_SECRET);

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCodes.unauthorized).json({ message: 'Token not found' });
  }

  const checkToken = jwt.verify(authorization, secret);

  if (!checkToken) return res.status(statusCodes.unauthorized).json({ message: 'Invalid token' });

  return next();
}
