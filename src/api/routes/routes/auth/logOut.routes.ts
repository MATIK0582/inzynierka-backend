import 'dotenv/config';
import { Request, Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { logOut } from '../../../controllers/logOut.controller';
import { verifyRefreshToken } from '../../../middlewares/auth/jwt.middleware';

const logOutDelete = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refresh_token;

    const response = await logOut(refreshToken);

    res.removeHeader('Authorization');
    res.clearCookie('refresh_token').status(response.json.statusCode).json(response.json);

    return;
};

const LOGOUT_DELETE_ROUTE: RouteDescription = {
    method: HttpMethod.DELETE,
    url: '/logout',
    handler: logOutDelete,
    middlewares: [verifyRefreshToken],
};

export default [LOGOUT_DELETE_ROUTE];
