import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db } from '../../config/config';
import { refreshTokens } from '../../models/refreshTokens.model';
import { FIFTEEN_MINUTES_IN_SECONDS, THIRTY_DAYS_IN_SECONDS } from '../../utils/constants';
import { findUserById } from '../../utils/queries/users/userQueries';
import { Roles } from '../../utils/database/models/roles';
import { ActionType, TokenPair } from '../../utils/authorization/tokens';

// @TODO: seperate to specific files

export const generateTokenPair = async (userId: string, action: ActionType, oldRefreshToken?: string) => {
    try {
        const user = await findUserById(userId);
        if (user) {
            const userData = { id: userId, role: user.role };
            const accessToken = generateAccessToken(userData);
            const refreshToken = generateRefreshToken(userId);

            if (action === ActionType.LOG_IN) {
                await db.insert(refreshTokens).values({
                    refreshToken: refreshToken,
                    // TODO: reconsider null as token from login origin
                    parentToken: 'login',
                    used: false,
                });
            }
            if (action === ActionType.REFRESH) {
                if (!oldRefreshToken) {
                    return null;
                }

                await markRefreshTokenAsUsed(oldRefreshToken);

                await db.insert(refreshTokens).values({
                    refreshToken: refreshToken,
                    parentToken: oldRefreshToken,
                    used: false,
                });
            }

            return { accessToken, refreshToken } as TokenPair;
        }
    } catch (error) {
        // FIXME: Add error handling
        console.log(error);
    }
    return null;
};

export const generateAccessToken = (userData: { id: string; role: Roles }) => {
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS512',
        expiresIn: FIFTEEN_MINUTES_IN_SECONDS,
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS512',
        expiresIn: THIRTY_DAYS_IN_SECONDS,
    });
};

export const markRefreshTokenAsUsed = async (oldRefreshToken: string) => {
    try {
        await db.update(refreshTokens).set({ used: true }).where(eq(refreshTokens.refreshToken, oldRefreshToken));
    } catch (error) {
        // @FIXME: Add proper error handling
        console.log(error);
    }
};

export const checkIfRefreshTokenWasUsed = async (refreshToken: string) => {
    try {
        const tokenData = await db.query.refreshTokens.findFirst({
            where: eq(refreshTokens.refreshToken, refreshToken),
        });

        if (!tokenData) {
            throw new Error('Token is not valid');
        }

        return tokenData.used;
    } catch (error) {
        // @FIXME: Add proper error handling
        console.log(error);
        return true;
    }
};
