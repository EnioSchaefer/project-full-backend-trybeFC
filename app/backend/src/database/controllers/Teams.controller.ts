import { Request, Response } from 'express';
import { TeamsService } from '../services';
import statusCodes from '../utils/statusCodes';

class TeamsController {
  constructor(private service = new TeamsService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    try {
      const teams = await this.service.getAllTeams();

      return res.status(statusCodes.ok).json(teams);
    } catch (err) {
      return res.status(statusCodes.internalError).end();
    }
  };

  public getTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const numId = Number(id);

      const team = await this.service.getTeamById(numId);

      return res.status(statusCodes.ok).json(team);
    } catch (err) {
      return res.status(statusCodes.internalError).end();
    }
  };
}

export default TeamsController;
