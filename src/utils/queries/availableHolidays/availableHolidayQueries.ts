import { eq, sql } from 'drizzle-orm';

import { db } from '../../../config/config';
import { availableHolidays } from '../../../models/availableHolidays.model';

export const getUserAvailavbleHolidays = async (userId: string) => {
    const userAvailableHolidays = await db.query.availableHolidays.findFirst({
        where: eq(availableHolidays.userId, userId),
    });

    return userAvailableHolidays;
};
