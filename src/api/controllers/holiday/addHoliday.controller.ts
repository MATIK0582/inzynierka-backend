import { HolidaysTypes } from '../../../models/holidays.model';
import { calculateLeaveDays } from '../../services/holidays/calculateLeaveDays.service';
import { hasSufficientLeaveDays } from '../../services/holidays/hasSufficientLeaveDays.service';
import { deductAvailableHolidays } from '../../services/holidays/deductAvailableHolidays.service';
import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { getUserOverlapingHolidays, insertLeave } from '../../../utils/queries/holidays/holidayQueries';
import { HolidayStatus } from '../../../utils/database/models/holidayStatuses';
import { holidayDatesValidator } from '../../validations/holidayDates.validator';

export const addHoliday = async ({
    userId,
    startDate,
    endDate,
    description,
    holidayType,
}: HolidaysTypes): Promise<StatusCode> => {
    try {
        const isValidated = holidayDatesValidator(startDate, endDate);
        if (!isValidated) {
            return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'Incorrect dates pair', 'Podano niepoprawne daty');
        }

        const overlapingHolidays = await getUserOverlapingHolidays(userId, startDate, endDate);
        if (overlapingHolidays.length) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Other leave already exists in that time period',
                'Inny urlop już istnieje w tym przedziale czasowym',
            );
        }

        const numberOfLeaveDays = calculateLeaveDays(startDate, endDate);

        // @FIXME: BETTER ERROR FOR DB FAIL
        if (!(await hasSufficientLeaveDays(userId, numberOfLeaveDays, holidayType))) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not enough available leave days',
                'Niewystarczająca ilość dostępnych dni urlopu',
            );
        }

        // @TODO: add & check company leave policies

        await insertLeave({ userId, startDate, endDate, description, holidayType, status: HolidayStatus.PENDING });

        await deductAvailableHolidays(userId, numberOfLeaveDays, holidayType);

        return createStatusCodeResponse(HTTP_CODES.CREATED, 'Holiday added', 'Dodano wniosek o urlop');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
