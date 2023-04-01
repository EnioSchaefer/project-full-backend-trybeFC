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

  public getAwayTeamsLeaderboard = async (req: Request, res: Response) => {
    try {
      const matches = await this.service.getAwayTeamsLeaderboard();

      return res.status(statusCodes.ok).json(matches);
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };

  public getTeamsLeaderboard = async (req: Request, res: Response) => {
    try {
      const matches = await this.service.getTeamsLeaderboard();

      return res.status(statusCodes.ok).json(matches);
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };
}
