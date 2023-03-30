import { Request, Response } from 'express';
import IMatch from '../interfaces/matches.interface';
import { MatchesService } from '../services';
import statusCodes from '../utils/statusCodes';

export default class MatchesController {
  constructor(protected service = new MatchesService()) { }

  public getMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { inProgress } = req.query;

      let matches: IMatch | IMatch[] = [];

      if (inProgress === undefined) matches = await this.service.getAllMatches();
      if (inProgress === 'true') matches = await this.service.getInProgressMatches();
      if (inProgress === 'false') matches = await this.service.getEndedMatches();

      return res.status(statusCodes.ok).json(matches);
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const numId = Number(id);

      const result = await this.service.finishMatch(numId);

      return res.status(statusCodes.ok).json(result);
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };

  public updateMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const numId = Number(id);
      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this.service.updateMatch(numId, homeTeamGoals, awayTeamGoals);

      return res.status(statusCodes.ok).json({ ...req.body });
    } catch (err) {
      return res.status(statusCodes.internalError).json(err);
    }
  };
}
