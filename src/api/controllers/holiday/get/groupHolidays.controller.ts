import { Roles } from '../../../../utils/database/models/roles';
import { getGroupHolidaysWithNamesByTeamLeader, getUserHolidays } from '../../../../utils/queries/holidays/holidayQueries';
import { getUserById } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../../validations/uuidv4.validator';

export const groupHolidays = async (userId: string, userRole: Roles): Promise<StatusCode> => {
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

        // if (userRole === Roles.USER) {
        //     return createStatusCodeResponse(
        //         HTTP_CODES.FORBIDDEN,
        //         'Not authorized to accept holidays',
        //         'Brak uprawnień do akceptacji urlopów',
        //     );
        // }

        // @FIXME: Auth

        const holidaysData = await getGroupHolidaysWithNamesByTeamLeader(userId);
        if (!holidaysData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find group holidays associated with provided user ID",
                'Nie znaleziono urlopów grupy dla podanego Id lidera',
            );
        }

        return createStatusCodeResponse(
            HTTP_CODES.OK,
            'Sending group holidays data',
            JSON.stringify(holidaysData),
        );
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};