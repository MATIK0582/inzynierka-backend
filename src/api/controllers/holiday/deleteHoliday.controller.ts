import { calculateLeaveDays } from '../../services/holidays/calculateLeaveDays.service';
import { returnAvailableHolidays } from '../../services/holidays/returnAvailableHolidays.service';
import { deleteUserHolidayById, getUserHolidayById } from '../../../utils/queries/holidays/holidayQueries';
import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const deleteHoliday = async (userId: string, holidayId: string): Promise<StatusCode> => {
    try {
        const isValidHolidayId = uuidv4Validator(holidayId);
        if (!isValidHolidayId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified UUID is not valid',
                'Podane UUID urlopu nie jest poprawne',
            );
        }

        const holidayData = await getUserHolidayById(userId, holidayId);
        if (!holidayData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find holiday with provided Id",
                'Nie znaleziono urlopu o podanym Id',
            );
        }

        const numberOfLeaveDays = calculateLeaveDays(holidayData.startDate, holidayData.endDate);

        await deleteUserHolidayById(userId, holidayId);

        await returnAvailableHolidays(userId, numberOfLeaveDays, holidayData.holidayType);

        return createStatusCodeResponse(HTTP_CODES.OK, 'Holiday removed', 'Usunięto wniosek o urlop');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
