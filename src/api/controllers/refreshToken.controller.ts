import jwt from 'jsonwebtoken';

import { createStatusCodeResponse, HTTP_CODES, StatusCodeWithTokenPair } from '../../utils/router/statusCodes';
import { checkIfRefreshTokenWasUsed, generateTokenPair } from '../services/jwt.service';
import { ActionType, RefreshTokenPayload } from '../../utils/authorization/tokens';

export const newRefreshToken = async (oldRefreshToken: string): Promise<StatusCodeWithTokenPair> => {
    try {
        const wasUsed = await checkIfRefreshTokenWasUsed(oldRefreshToken);
        if (wasUsed) {
            // @TODO: mark token family as stolen if used
            return createStatusCodeResponse(HTTP_CODES.FORBIDDEN, 'Not valid token', 'Niepoprawny token');
        }

        const decoded = jwt.decode(oldRefreshToken) as RefreshTokenPayload;

        // @TODO: check token origin
        // Posibility of login origin flag in access token

        const tokenPair = await generateTokenPair(decoded.id, ActionType.REFRESH, oldRefreshToken);

        // @FIXME: BETTER ERROR FOR JTW FAIL
        if (!tokenPair) {
            return createStatusCodeResponse(HTTP_CODES.SERVER_ERROR, 'SERVER ERROR', 'Coś proszło nie tak');
        }

        return {
            ...createStatusCodeResponse(HTTP_CODES.OK, 'Successfully generated new token', 'Wygenerowano nowy token'),
            tokenPair,
        };
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
