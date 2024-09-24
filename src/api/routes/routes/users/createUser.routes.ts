import { Request, Response } from 'express';
import { UsersTypes } from '../../../../models/users.model';
import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { createUser } from '../../../controllers/user.controller';

const createUserPost = async (req: Request, res: Response): Promise<void> => {
    const { name, surname, email, password }: UsersTypes = req.body;

    const response = await createUser({ name, surname, email, password });

    res.status(response.json.statusCode).json(response.json);

    return;
};

const CREATE_USER_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/user/create',
    handler: createUserPost,
};

export default [CREATE_USER_POST_ROUTE];
