import { Router } from 'express';

import HOME_ROUTES from './routes/home.routes';
import NOT_FOUND_ROUTES from './routes/notFound.routes';
import { registerRoutes } from '../../utils/router/routerUtils';
import { RouteDescription } from '../../utils/router/routeDescription';

export const router = Router();

const ROUTES: RouteDescription[] = [
    ...HOME_ROUTES,
    // Must be last initialized
    ...NOT_FOUND_ROUTES,
];

registerRoutes(router, ROUTES);
