import { Request, Response } from 'express';
import TeamsService from '../services';

class TeamsController {
  constructor(private service = new TeamsService()) {}

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();

    return res.status(200).json(teams);
  };
}

export default TeamsController;
