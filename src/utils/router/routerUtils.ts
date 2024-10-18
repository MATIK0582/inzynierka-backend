import { Router } from 'express';
import { HttpMethod } from './httpMethods';
import { RouteDescription } from './routeDescription';

export const registerRoutes = (router: Router, routes: RouteDescription[]): void => {
    routes.forEach((route: RouteDescription) => {
        const middlewares = route.middlewares || [];

        switch (route.method) {
            case HttpMethod.GET:
                router.get(route.url, ...middlewares, route.handler);
                break;
            case HttpMethod.POST:
                router.post(route.url, ...middlewares, route.handler);
                break;
            case HttpMethod.PUT:
                router.put(route.url, ...middlewares, route.handler);
                break;
            case HttpMethod.DELETE:
                router.delete(route.url, ...middlewares, route.handler);
                break;
            default:
                break;
        }
    });
};

