import { Router } from 'express';
import { TeamsController } from '../controllers';

const TeamsRoutes = Router();

const controller = new TeamsController();

TeamsRoutes.get('/:id', controller.getTeamById);
TeamsRoutes.get('/', controller.getAllTeams);

export default TeamsRoutes;
