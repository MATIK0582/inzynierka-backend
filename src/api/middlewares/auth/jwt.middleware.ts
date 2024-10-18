import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AccessTokenPayload } from '../../../utils/authorization/tokens';

// export interface CustomRequest extends Request {
//     user?: string;
//     accessToken?: string;
//     refreshToken?: string;
// }

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed. Token missing.');
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as AccessTokenPayload;

        // req.user = user
        // req.token = token

        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed.' });
    }
};

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new Error('Authentication failed. Token missing.');
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Authentication failed.' });
    }
};
