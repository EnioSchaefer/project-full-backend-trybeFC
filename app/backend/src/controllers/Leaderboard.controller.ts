import { Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(protected service = new LeaderboardService()) {}

  public getHomeTeamsLeaderboard = async (req: Request, res: Response) => {
    try {
      const matches = await this.service.getHomeTeamsLeaderboard();

      return res.status(statusCodes.ok).json(matches);
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };
}
