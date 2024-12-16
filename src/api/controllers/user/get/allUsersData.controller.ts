import { Roles } from '../../../../utils/database/models/roles';
import { getAllUsersData } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';

export const allUsersData = async (userRole: Roles): Promise<StatusCode> => {
    try {
        // @FIXME: Auth!

        const userData = await getAllUsersData();
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
