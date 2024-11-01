import { getHolidaysForYear } from '../../../utils/holidays/getHolidaysForYear';
import { isHoliday, isWeekend } from '../../../utils/holidays/holidays';

export const calculateLeaveDays = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // @TODO: Chache holidays dates
    const holidaysDates = [
        ...getHolidaysForYear(startDate.getFullYear()),
        ...getHolidaysForYear(endDate.getFullYear()),
    ];

    const holidaysDatesDuringLeave = holidaysDates
        .filter((date, index, self) => index === self.findIndex((d) => d.getTime() === date.getTime()))
        .filter((date) => date >= startDate && date <= endDate);

    let leaveDays = 0;

    const currentDate = startDate;

    while (currentDate <= endDate) {
        if (!isWeekend(currentDate) && !isHoliday(currentDate, holidaysDatesDuringLeave)) {
            leaveDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return leaveDays;
};
