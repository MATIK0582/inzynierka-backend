import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { markRefreshTokenAsUsed } from '../../services/jwt.service';

export const logOut = async (refreshToken: string): Promise<StatusCode> => {
    try {
        await markRefreshTokenAsUsed(refreshToken);

        return createStatusCodeResponse(HTTP_CODES.NO_CONTENT, 'Successfully removed tokens', 'Wylogowano');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
