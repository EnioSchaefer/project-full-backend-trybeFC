import { Router } from 'express';
import validateToken from '../database/middlewares/validateToken';
import validateUserLogin from '../database/middlewares/validateUserLogin';
import { UsersController } from '../database/controllers';

const UsersRoutes = Router();

const controller = new UsersController();

UsersRoutes.get('/role', validateToken, controller.getUserRole);
UsersRoutes.post('/', validateUserLogin, controller.userLogin);

export default UsersRoutes;
