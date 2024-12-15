import { Request, Response } from 'express';

import { UsersTypes } from '../../../../models/users.model';
import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { createUser } from '../../../controllers/user/createUser.controller';
import { AuthenticatedRequest } from '../../../../utils/router/requestDescription';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';
import { ownData } from '../../../controllers/user/get/ownData.controller';
import { employeeData } from '../../../controllers/user/get/employeeData.controller';

const createUserPost = async (req: Request, res: Response): Promise<void> => {
    const { name, surname, email, password }: UsersTypes = req.body;

    const response = await createUser({ name, surname, email, password });

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ownDataGet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;

    const response = await ownData(userId);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const employeeDataGet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;
    const { employeeId } = req.body;

    const response = await employeeData(employeeId, userRole);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const CREATE_USER_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/user/create',
    handler: createUserPost,
};

const OWN_DATA_GET_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.GET,
    url: '/user/data/own',
    handler: ownDataGet,
    middlewares: [verifyAccessToken],
};

const EMPLOYEE_DATA_GET_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.GET,
    url: '/user/data/employee',
    handler: employeeDataGet,
    middlewares: [verifyAccessToken],
};

export default [CREATE_USER_POST_ROUTE, OWN_DATA_GET_ROUTE, EMPLOYEE_DATA_GET_ROUTE];
