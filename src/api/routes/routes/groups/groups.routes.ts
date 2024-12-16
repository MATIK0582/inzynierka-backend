import { Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';
import { AuthenticatedRequest } from '../../../../utils/router/requestDescription';
import { addGroup } from '../../../controllers/groups/addGroup.controller';

const addGroupPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;
    const { name, leaderId } = req.body;

    const response = await addGroup(userRole, name, leaderId);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ADD_GROUP_POST_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.POST,
    url: '/group/add',
    handler: addGroupPost,
    middlewares: [verifyAccessToken],
};

export default [ADD_GROUP_POST_ROUTE];
