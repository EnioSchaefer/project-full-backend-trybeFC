import { Router } from 'express';
import { MatchesController } from '../controllers';

const MatchesRoutes = Router();

const controller = new MatchesController();

MatchesRoutes.get('/', controller.getMatches);

export default MatchesRoutes;
