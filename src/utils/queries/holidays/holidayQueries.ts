import { and, or, eq, lte, gte } from 'drizzle-orm';
import { db } from '../../../config/config';
import { holidays, HolidaysTypes } from '../../../models/holidays.model';
import { HolidayStatus } from '../../database/models/holidayStatuses';
import { users } from '../../../models/users.model';
import { userGroups } from '../../../models/userGroups.model';
import { groups } from '../../../models/groups.model';

export const insertLeave = async ({ userId, startDate, endDate, description, holidayType, status }: HolidaysTypes) => {
    await db.insert(holidays).values({
        userId: userId,
        startDate: startDate,
        endDate: endDate,
        description: description,
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

export const getHolidayById = async (holidayId: string) => {
    const holiday = await db.query.holidays.findFirst({
        where: eq(holidays.id, holidayId),
    });

    return holiday;
};

export const getUserHolidayById = async (userId: string, holidayId: string) => {
    const userHoliday = await db.query.holidays.findFirst({
        where: and(eq(holidays.userId, userId), eq(holidays.id, holidayId)),
    });

    return userHoliday;
};

export const getUserHolidays = async (userId: string) => {
    const getUserHolidays = await db.query.holidays.findMany({
        where: eq(holidays.userId, userId),
    });

    return getUserHolidays;
};

export const updateHolidayStatus = async (holidayId: string, newStatus: HolidayStatus) => {
    await db
        .update(holidays)
        .set({
            status: newStatus,
        })
        .where(eq(holidays.id, holidayId));
};

export const deleteUserHolidayById = async (userId: string, holidayId: string) => {
    await db.delete(holidays).where(and(eq(holidays.userId, userId), eq(holidays.id, holidayId)));
};
