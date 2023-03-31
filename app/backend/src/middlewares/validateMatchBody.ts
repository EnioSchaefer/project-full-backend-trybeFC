import { NextFunction, Request, Response } from 'express';
import { TeamsService } from '../services';
import statusCodes from '../utils/statusCodes';

export default async function validateMatchBody(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(statusCodes.unprocessable)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const service = new TeamsService();

  const teams = await service.getAllTeams();
  const teamsIds = teams.map((team) => team.id);

  if (!teamsIds.includes(homeTeamId) || !teamsIds.includes(awayTeamId)) {
    return res.status(statusCodes.notFound)
      .json({ message: 'There is no team with such id!' });
  }

  return next();
}
