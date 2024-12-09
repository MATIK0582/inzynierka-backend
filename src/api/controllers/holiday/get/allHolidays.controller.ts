import { Roles } from '../../../../utils/database/models/roles';
import { getAllHolidaysWithNames } from '../../../../utils/queries/holidays/holidayQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';

export const allHolidays = async (userRole: Roles): Promise<StatusCode> => {
    try {
        // if (userRole === Roles.USER) {
        //     return createStatusCodeResponse(
        //         HTTP_CODES.FORBIDDEN,
        //         'Not authorized to accept holidays',
        //         'Brak uprawnień do akceptacji urlopów',
        //     );
        // }

        // @FIXME: Auth

        const holidaysData = await getAllHolidaysWithNames();
        if (!holidaysData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find holidays in DB",
                'Nie znaleziono urlopów w bazie danych',
            );
        }

        return createStatusCodeResponse(HTTP_CODES.OK, 'Sending holidays data', JSON.stringify(holidaysData));
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
