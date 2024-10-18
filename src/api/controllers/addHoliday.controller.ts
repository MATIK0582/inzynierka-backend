import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../utils/router/statusCodes';

export const addHoliday = async (testString: string): Promise<StatusCode> => {
    try {
        return createStatusCodeResponse(HTTP_CODES.OK, testString, 'Otrzymano token');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
