import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';

import { router } from './api/routes';

export const app: Express = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(cookieParser());

app.use('/', router);
