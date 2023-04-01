import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const LeaderboardRoutes = Router();

const controller = new LeaderboardController();

LeaderboardRoutes.get('/home', controller.getHomeTeamsLeaderboard);
LeaderboardRoutes.get('/away', controller.getAwayTeamsLeaderboard);
LeaderboardRoutes.get('/', controller.getTeamsLeaderboard);

export default LeaderboardRoutes;
