import { Request, Response, NextFunction } from 'express';
import { HttpMethod } from './httpMethods';

export interface RouteDescription {
    method: HttpMethod;
    url: string | string[];
    handler: (req: Request, res: Response) => void;
    middlewares?: ((req: Request, res: Response, next: NextFunction) => void)[];
}
