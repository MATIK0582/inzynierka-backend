import { and, or, eq, lte, gte } from 'drizzle-orm';
import { db } from '../../../config/config';
import { holidays, HolidaysTypes } from '../../../models/holidays.model';

export const insertLeave = async ({ userId, startDate, endDate, desciption, holidayType, status }: HolidaysTypes) => {
    await db.insert(holidays).values({
        userId: userId,
        startDate: startDate,
        endDate: endDate,
        desciption: desciption,
        holidayType: holidayType,
        status: status,
    });
};

export const getUserOverlapingHolidays = async (userId: string, startDate: string, endDate: string) => {
    const overlapingHolidays = await db
        .select()
        .from(holidays)
        .where(
            and(
                eq(holidays.userId, userId),
                or(
                    // New start date during already existing leave.
                    and(lte(holidays.startDate, startDate), gte(holidays.endDate, startDate)),

                    // New end date during already existing leave.
                    and(lte(holidays.startDate, endDate), gte(holidays.endDate, endDate)),

                    // New leave contains already existing leave.
                    and(gte(holidays.startDate, startDate), lte(holidays.endDate, endDate)),
                ),
            ),
        );

    return overlapingHolidays;
};

export const getUserHolidays = async (userId: string) => {
    const getUserHolidays = await db.query.holidays.findMany({
        where: eq(holidays.userId, userId),
    });

    return getUserHolidays;
};

export const getUserHolidayById = async (userId: string, holidayId: string) => {
    const userHoliday = await db.query.holidays.findFirst({
        where: and(eq(holidays.userId, userId), eq(holidays.id, holidayId)),
    });

    return userHoliday;
};

export const deleteUserHolidayById = async (userId: string, holidayId: string) => {
    await db.delete(holidays).where(and(eq(holidays.userId, userId), eq(holidays.id, holidayId)));
};
