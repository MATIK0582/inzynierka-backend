import { Roles } from '../database/models/roles';

export enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
}

export enum ActionType {
    LOG_IN = 'log_in',
    REFRESH = 'refresh',
}

export interface AccessTokenPayload {
    id: string;
    role: Roles;
    iat: number;
    exp: number;
}

export interface RefreshTokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
