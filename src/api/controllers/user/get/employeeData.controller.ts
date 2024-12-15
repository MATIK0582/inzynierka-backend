import { Roles } from '../../../../utils/database/models/roles';
import { getUserById, getUserDataById } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../../validations/uuidv4.validator';

export const employeeData = async (employeeId: string, userRole: Roles): Promise<StatusCode> => {
    try {
        const isValidUserId = uuidv4Validator(employeeId);
        if (!isValidUserId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified UUID is not valid',
                'Podane UUID użytkownika nie jest poprawne',
            );
        }

        const user = await getUserById(employeeId);
        if (!user) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                `Can't find user with provided Id`,
                'Nie znaleziono użtykownika o podanym Id',
            );
        }

        // @FIXME: Auth!

        const userData = await getUserDataById(employeeId);
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
