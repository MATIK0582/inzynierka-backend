import { Request } from 'express';
import { Roles } from '../database/models/roles';

export interface CustomRequest extends Request {
    user?: {
        id: string;
        role: Roles;
    };
    accessToken?: string;
    refreshToken?: string;
}

export interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        role: Roles;
    };
    accessToken: string;
    refreshToken?: string;
}

