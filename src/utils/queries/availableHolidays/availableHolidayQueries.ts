import { eq, sql } from 'drizzle-orm';

import { db } from '../../../config/config';
import { availableHolidays, AvailableHolidaysTypes } from '../../../models/availableHolidays.model';

export const getUserAvailavbleHolidays = async (userId: string) => {
    const userAvailableHolidays = await db.query.availableHolidays.findFirst({
        where: eq(availableHolidays.userId, userId),
    });

    return userAvailableHolidays;
};

export const insertDefaultAvailableHolidays = async ({ userId }: AvailableHolidaysTypes) => {
    await db.insert(availableHolidays).values({
        userId: userId,
        holiday: 26,
        holidayUponRequest: 4
    });
};
