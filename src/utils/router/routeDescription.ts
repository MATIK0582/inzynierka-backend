import { Request, Response, NextFunction } from 'express';
import { HttpMethod } from './httpMethods';

export interface RouteDescription<R extends Request = Request> {
    method: HttpMethod;
    url: string | string[];
    handler: (req: R, res: Response) => void;
    middlewares?: ((req: R, res: Response, next: NextFunction) => void)[];
}
