import { Request, Response } from 'express';

import { HttpMethod } from '../../../utils/router/httpMethods';
import { HTTP_CODES, STATUS_CODES } from '../../../utils/router/statusCodes';
import { RouteDescription } from '../../../utils/router/routeDescription';

const homeRouteGetImplementation = (req: Request, res: Response): void => {
    res.status(HTTP_CODES.OK).json(STATUS_CODES[HTTP_CODES.OK].json);
    return;
};

const homeRoutePost = (req: Request, res: Response): void => {
    res.status(HTTP_CODES.METHOD_NOT_ALLOWED).json(STATUS_CODES[HTTP_CODES.METHOD_NOT_ALLOWED].json);
    return;
};

const HOME_GET_ROUTE: RouteDescription = {
    method: HttpMethod.GET,
    url: '/',
    handler: homeRouteGetImplementation,
};

const HOME_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/',
    handler: homeRoutePost,
};

export default [HOME_GET_ROUTE, HOME_POST_ROUTE];
