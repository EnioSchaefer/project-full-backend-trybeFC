import { Router } from 'express';
import TeamsController from '../database/controllers';

const TeamsRoutes = Router();

const controller = new TeamsController();

TeamsRoutes.get('/', controller.getAllTeams);

export default TeamsRoutes;
