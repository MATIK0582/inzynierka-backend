import { Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';
import { AuthenticatedRequest } from '../../../../utils/router/requestDescription';
import { addGroup } from '../../../controllers/groups/addGroup.controller';
import { addMember } from '../../../controllers/groups/addMember.controller';
import { allGroups } from '../../../controllers/groups/get/allGroups.controller';
import { deleteGroup } from '../../../controllers/groups/deleteGroup.controller';

const addGroupPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;
    const { name, leaderId } = req.body;

    const response = await addGroup(userRole, name, leaderId);

    console.log(response);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const deleteGroupDelete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;
    const { groupId } = req.body;

    const response = await deleteGroup(userRole, groupId);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const addMemberPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;
    const { employeeId, groupId } = req.body;

    const response = await addMember(userRole, employeeId, groupId);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const allGroupsGet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // const userId = req.user.id;
    const userRole = req.user.role;

    const response = await allGroups(userRole);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ADD_GROUP_POST_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.POST,
    url: '/group/add',
    handler: addGroupPost,
    middlewares: [verifyAccessToken],
};

const DELETE_GROUP_DELETE_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.DELETE,
    url: '/group/delete',
    handler: deleteGroupDelete,
    middlewares: [verifyAccessToken],
};

const ADD_MEMBER_POST_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.POST,
    url: '/group/member/add',
    handler: addMemberPost,
    middlewares: [verifyAccessToken],
};

const ADD_MEMBER_GET_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.GET,
    url: '/group/all',
    handler: allGroupsGet,
    middlewares: [verifyAccessToken],
};

export default [ADD_GROUP_POST_ROUTE, ADD_MEMBER_POST_ROUTE, ADD_MEMBER_GET_ROUTE, DELETE_GROUP_DELETE_ROUTE];
