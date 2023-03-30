import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import statusCodes from '../../utils/statusCodes';

require('dotenv/config');

const secret = String(process.env.JWT_SECRET);

export default function authorizeToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCodes.unauthorized).json({ message: 'Token not found' });
  }

  try {
    const userData = jwt.verify(authorization, secret);

    req.body.userData = userData;
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
}
