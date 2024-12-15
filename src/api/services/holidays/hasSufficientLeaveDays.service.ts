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

    const alwaysAcceptedHolidayTypes: HolidayType[] = [
        HolidayType.SICK,
        HolidayType.UNPAID,
        HolidayType.MATERNITY,
        HolidayType.PATERNITY,
        HolidayType.PARENTAL,
        HolidayType.CHILDCARE,
        HolidayType.OCCASIONAL,
    ];

    if (alwaysAcceptedHolidayTypes.includes(holidayType)) {
        return true;
    }

    return false;
};
