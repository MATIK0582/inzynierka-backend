import { Router } from 'express';

import HOME_ROUTES from './routes/home.routes';
import NOT_FOUND_ROUTES from './routes/notFound.routes';
import CREATE_USER_POST_ROUTE from './routes/users/user.routes';
import ADD_HOLIDAY_POST_ROUTE from './routes/holiday/holiday.routes';
import LOGIN_POST_ROUTE from './routes/auth/logIn.routes';
import LOGOUT_DELETE_ROUTE from './routes/auth/logOut.routes';
import REFRESH_TOKEN_POST_ROUTE from './routes/auth/token.routes';
import { registerRoutes } from '../../utils/router/routerUtils';
import { RouteDescription } from '../../utils/router/routeDescription';

export const router = Router();

const ROUTES: RouteDescription[] = [
    ...HOME_ROUTES,
    ...CREATE_USER_POST_ROUTE,
    ...LOGIN_POST_ROUTE,
    ...ADD_HOLIDAY_POST_ROUTE,
    ...REFRESH_TOKEN_POST_ROUTE,
    ...LOGOUT_DELETE_ROUTE,
    // Must be last initialized
    ...NOT_FOUND_ROUTES,
];

registerRoutes(router, ROUTES);
