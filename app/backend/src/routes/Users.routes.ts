import { Router } from 'express';
import authorizeToken from '../middlewares/auth/authorizeToken';
import validateUserLogin from '../middlewares/validateUserLogin';
import { UsersController } from '../controllers';

const UsersRoutes = Router();

const controller = new UsersController();

UsersRoutes.get('/role', authorizeToken, controller.getUserRole);
UsersRoutes.post('/', validateUserLogin, controller.userLogin);

export default UsersRoutes;
