import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const LeaderboardRoutes = Router();

const controller = new LeaderboardController();

LeaderboardRoutes.get('/home', controller.getHomeTeamsLeaderboard);

export default LeaderboardRoutes;
