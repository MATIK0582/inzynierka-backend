import { getUserHolidays } from '../../../../utils/queries/holidays/holidayQueries';
import { getUserById } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../../validations/uuidv4.validator';

export const ownHolidays = async (userId: string): Promise<StatusCode> => {
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

        const holidaysData = await getUserHolidays(userId);
        if (!holidaysData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find holidays associated with provided user ID",
                'Nie znaleziono urlopów użytkownika z podanym Id',
            );
        }

        //TODO: One sql query?
        const holidaysDataWithUserName = holidaysData.map((holiday) => ({
            ...holiday,
            name: user.name,
            surname: user.surname,
        }));

        return createStatusCodeResponse(
            HTTP_CODES.OK,
            'Sending holidays data',
            JSON.stringify(holidaysDataWithUserName),
        );
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
