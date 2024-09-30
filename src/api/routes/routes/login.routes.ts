import { Request, Response } from 'express';
import { UsersTypes } from '../../../models/users.model';
import { RouteDescription } from '../../../utils/router/routeDescription';
import { HttpMethod } from '../../../utils/router/httpMethods';
import { logIn } from '../../controllers/logIn.controller';

const loginPost = async (req: Request, res: Response): Promise<void> => {
    const { email, password }: UsersTypes = req.body;

    console.log(email, password);

    const response = await logIn({ email, password });

    res.status(response.json.statusCode).json(response.json);

    return;
};

const LOGIN_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/login',
    handler: loginPost,
};

export default [LOGIN_POST_ROUTE];
