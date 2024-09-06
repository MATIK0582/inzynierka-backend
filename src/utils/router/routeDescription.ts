import { Request, Response } from 'express';
import { HttpMethod } from './httpMethods';

export interface RouteDescription {
    method: HttpMethod;
    url: string | string[];
    handler: (req: Request, res: Response) => void;
}
