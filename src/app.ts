import express, { type Express } from 'express';
import { router } from './api/routes';

export const app: Express = express();

app.use('/', router);
