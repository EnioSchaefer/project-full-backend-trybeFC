import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../services';
import statusCodes from '../utils/statusCodes';

require('dotenv/config');

const secret = String(process.env.JWT_SECRET);

class UsersController {
  constructor(private service = new UsersService()) { }

  public userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const login = await this.service.userLogin(email, password);

      if (Object.keys(login).includes('message')) {
        return res.status(statusCodes.unauthorized).json(login);
      }

      const token = jwt.sign(login, secret, { algorithm: 'HS256', expiresIn: '7d' });

      return res.status(statusCodes.ok).json({ token });
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };

  public getUserRole = async (req: Request, res: Response) => {
    try {
      const { userData } = req.body;

      return res.status(statusCodes.ok).json({ role: userData.dataValues.role });
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };
}

export default UsersController;
