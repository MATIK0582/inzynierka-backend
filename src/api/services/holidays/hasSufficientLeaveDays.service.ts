import { HolidayType } from '../../../utils/database/models/holidayTypes';
import { getUserAvailavbleHolidays } from '../../../utils/queries/availableHolidays/availableHolidayQueries';

export const hasSufficientLeaveDays = async (
    userId: string,
    numberOfLeaveDays: number,
    holidayType: HolidayType,
): Promise<boolean> => {
    const userAvailableHolidays = await getUserAvailavbleHolidays(userId);

    if (userAvailableHolidays) {
        if (holidayType === HolidayType.ANNUAL) {
            return numberOfLeaveDays <= userAvailableHolidays.holiday;
        } else if (holidayType === HolidayType.ON_DEMAND) {
            return numberOfLeaveDays <= userAvailableHolidays.holidayUponRequest;
        }
    }

    return false;
};
