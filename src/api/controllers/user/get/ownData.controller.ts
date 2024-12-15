import { getUserById, getUserDataById } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../../validations/uuidv4.validator';

export const ownData = async (userId: string): Promise<StatusCode> => {
    try {
        const isValidUserId = uuidv4Validator(userId);
        if (!isValidUserId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified UUID is not valid',
                'Podane UUID użytkownika nie jest poprawne',
            );
        }

        const user = await getUserById(userId);
        if (!user) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                `Can't find user with provided Id`,
                'Nie znaleziono użtykownika o podanym Id',
            );
        }

        const userData = await getUserDataById(userId);
        if (!userData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't get data of provided user Id",
                'Nie można pobrać danych użytkownika o podanym Id',
            );
        }

        return createStatusCodeResponse(HTTP_CODES.OK, 'Sending user data', JSON.stringify(userData));
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
