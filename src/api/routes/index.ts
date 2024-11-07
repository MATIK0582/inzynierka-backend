import { Router } from 'express';

import HOME_ROUTES from './routes/home.routes';
import USER_ROUTES from './routes/users/user.routes';
import HOLIDAY_ROUTES from './routes/holiday/holiday.routes'
import LOGIN_POST_ROUTE from './routes/auth/logIn.routes';
import LOGOUT_DELETE_ROUTE from './routes/auth/logOut.routes';
import REFRESH_TOKEN_POST_ROUTE from './routes/auth/token.routes';
import NOT_FOUND_ROUTES from './routes/notFound.routes';
import { registerRoutes } from '../../utils/router/routerUtils';
import { RouteDescription } from '../../utils/router/routeDescription';

export const router = Router();

// @FIXME: TS shenanigans
// RouteDescription<AuthenticatedRequest>[]
// Works in runtime but it raises TS Error

// Possible solution here, but not ideal
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript

// Affected files:
//  routerUtils.ts
//  routeDescripiton.ts
//  requestDescription.ts
//  ALL ROUTE FILES WITH  "req: AuthenticatedRequest"

const ROUTES: RouteDescription[] = [
    ...HOME_ROUTES,
    ...USER_ROUTES,
    ...HOLIDAY_ROUTES,
    ...LOGIN_POST_ROUTE,
    ...LOGOUT_DELETE_ROUTE,
    ...REFRESH_TOKEN_POST_ROUTE,
    // Must be last initialized
    ...NOT_FOUND_ROUTES,
];

registerRoutes(router, ROUTES);
