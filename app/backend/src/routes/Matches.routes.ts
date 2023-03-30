import { Router } from 'express';
import authorizeToken from '../middlewares/auth/authorizeToken';
import { MatchesController } from '../controllers';

const MatchesRoutes = Router();

const controller = new MatchesController();

MatchesRoutes.get('/', controller.getMatches);
MatchesRoutes.patch('/:id/finish', authorizeToken, controller.finishMatch);

export default MatchesRoutes;
