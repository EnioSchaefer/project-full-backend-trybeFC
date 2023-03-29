import { Request, Response } from 'express';
import TeamsService from '../services';

class TeamsController {
  constructor(private service = new TeamsService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();

    return res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const numId = Number(id);

    const team = await this.service.getTeamById(numId);

    return res.status(200).json(team);
  };
}

export default TeamsController;
