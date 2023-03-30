import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import validateUserLogin from '../middlewares/validateUserLogin';
import { UsersController } from '../controllers';

const UsersRoutes = Router();

const controller = new UsersController();

UsersRoutes.get('/role', validateToken, controller.getUserRole);
UsersRoutes.post('/', validateUserLogin, controller.userLogin);

export default UsersRoutes;
