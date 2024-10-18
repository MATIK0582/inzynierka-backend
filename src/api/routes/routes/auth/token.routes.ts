import 'dotenv/config';
import { Request, Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { verifyRefreshToken } from '../../../middlewares/auth/jwt.middleware';
import { newRefreshToken } from '../../../controllers/auth/refreshToken.controller';
import { HTTP_CODES } from '../../../../utils/router/statusCodes';

const refreshTokenPost = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refresh_token;

    const response = await newRefreshToken(refreshToken);

    if (response.tokenPair) {
        res.setHeader('Authorization', `Bearer ${response.tokenPair.accessToken}`)
            .cookie('refresh_token', response.tokenPair.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .status(response.json.statusCode)
            .json(response.json);
    } else {
        res.status(response.json.statusCode).json(response.json);
    }

    return;
};

const REFRESH_TOKEN_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/token/refresh',
    handler: refreshTokenPost,
    middlewares: [verifyRefreshToken],
};

export default [REFRESH_TOKEN_POST_ROUTE];
