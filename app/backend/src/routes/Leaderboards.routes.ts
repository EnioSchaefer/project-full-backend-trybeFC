import { Router } from 'express';
// import authorizeToken from '../middlewares/auth/authorizeToken';
import { LeaderboardController } from '../controllers';

const LeaderboardRoutes = Router();

const controller = new LeaderboardController();

LeaderboardRoutes.get('/home', controller.getHomeTeamsLeaderboard);

export default LeaderboardRoutes;
