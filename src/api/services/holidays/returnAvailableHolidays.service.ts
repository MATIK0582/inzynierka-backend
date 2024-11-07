import { eq, sql } from 'drizzle-orm';

import { db } from '../../../config/config';
import { availableHolidays } from '../../../models/availableHolidays.model';
import { HolidayType } from '../../../utils/database/models/holidayTypes';

// @TODO: Make univrsal fnc for adding and returning
export const returnAvailableHolidays = async (userId: string, numberOfLeaveDays: number, holidayType: HolidayType) => {
    if (holidayType === HolidayType.ANNUAL) {
        await db
            .update(availableHolidays)
            .set({
                holiday: sql`${availableHolidays.holiday} + ${numberOfLeaveDays}`,
            })
            .where(eq(availableHolidays.userId, userId));
    } else if (holidayType === HolidayType.ON_DEMAND) {
        await db
            .update(availableHolidays)
            .set({
                holiday: sql`${availableHolidays.holiday} + ${numberOfLeaveDays}`,
                holidayUponRequest: sql`${availableHolidays.holidayUponRequest} + ${numberOfLeaveDays}`,
            })
            .where(eq(availableHolidays.userId, userId));
    }
};
