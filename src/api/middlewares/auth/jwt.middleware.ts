import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { AccessTokenPayload, RefreshTokenPayload } from '../../../utils/authorization/tokens';
import { CustomRequest } from '../../../utils/router/requestDescription';

export const verifyAccessToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed. Token missing.');
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as AccessTokenPayload;
        const userData = { id: decoded.userId, role: decoded.role };

        req.user = userData;
        req.accessToken = token;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed.' });
    }
};

export const verifyRefreshToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new Error('Authentication failed. Token missing.');
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as RefreshTokenPayload;

        req.refreshToken = refreshToken;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Authentication failed.' });
    }
};
