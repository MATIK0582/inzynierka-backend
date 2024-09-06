import { Request, Response } from 'express';

import { HttpMethod } from '../../../utils/router/httpMethods';
import { HTTP_CODES, STATUS_CODES } from '../../../utils/router/statusCodes';
import { RouteDescription } from '../../../utils/router/routeDescription';

const notFoundRouteImplementation = (req: Request, res: Response): void => {
    res.status(HTTP_CODES.NOT_FOUND).json(STATUS_CODES[HTTP_CODES.NOT_FOUND].json);
    return;
};

const NOT_FOUND_GET_ROUTE: RouteDescription = {
    method: HttpMethod.GET,
    url: '*',
    handler: notFoundRouteImplementation,
};

const NOT_FOUND_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '*',
    handler: notFoundRouteImplementation,
};

const NOT_FOUND_PUT_ROUTE: RouteDescription = {
    method: HttpMethod.PUT,
    url: '*',
    handler: notFoundRouteImplementation,
};

const NOT_FOUND_DELETE_ROUTE: RouteDescription = {
    method: HttpMethod.DELETE,
    url: '*',
    handler: notFoundRouteImplementation,
};

export default [NOT_FOUND_GET_ROUTE, NOT_FOUND_POST_ROUTE, NOT_FOUND_PUT_ROUTE, NOT_FOUND_DELETE_ROUTE];
