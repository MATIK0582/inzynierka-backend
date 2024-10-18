import 'dotenv/config';
import { Request, Response } from 'express';

import { UsersTypes } from '../../../../models/users.model';
import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { logIn } from '../../../controllers/auth/logIn.controller';

const logInPost = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: UsersTypes = req.body;

    const response = await logIn({ email, password });

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

const LOGIN_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/login',
    handler: logInPost,
};

export default [LOGIN_POST_ROUTE];
