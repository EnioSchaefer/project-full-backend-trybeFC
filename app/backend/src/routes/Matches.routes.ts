import { Router } from 'express';
import validateMatchBody from '../middlewares/validateMatchBody';
import authorizeToken from '../middlewares/auth/authorizeToken';
import { MatchesController } from '../controllers';

const MatchesRoutes = Router();

const controller = new MatchesController();

MatchesRoutes.post('/', authorizeToken, validateMatchBody, controller.insertMatch);
MatchesRoutes.patch('/:id/finish', authorizeToken, controller.finishMatch);
MatchesRoutes.patch('/:id', authorizeToken, controller.updateMatch);
MatchesRoutes.get('/', controller.getMatches);

export default MatchesRoutes;
