import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { router } from './api/routes';

export const app: Express = express();

app.use(cors({
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
}));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(cookieParser());

app.use('/', router);
