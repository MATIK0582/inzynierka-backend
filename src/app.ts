import express, { type Express } from 'express';

import { router } from './api/routes';

export const app: Express = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use('/', router);
