import { Router } from 'express';
import authorizeToken from '../middlewares/auth/authorizeToken';
import { MatchesController } from '../controllers';

const MatchesRoutes = Router();

const controller = new MatchesController();

MatchesRoutes.patch('/:id/finish', authorizeToken, controller.finishMatch);
MatchesRoutes.patch('/:id', authorizeToken, controller.updateMatch);
MatchesRoutes.get('/', controller.getMatches);

export default MatchesRoutes;
