import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/user', UserController.listAllUsers)

export default routes;
