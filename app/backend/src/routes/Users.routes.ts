import { Router } from 'express';
import validateUserLogin from '../database/middlewares/validateUserLogin';
import { UsersController } from '../database/controllers';

const UsersRoutes = Router();

const controller = new UsersController();

UsersRoutes.post('/', validateUserLogin, controller.userLogin);

export default UsersRoutes;
