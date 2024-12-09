import { and, eq, gte, lte, or } from 'drizzle-orm';
import { db } from '../../../config/config';
import { groups } from '../../../models/groups.model';
import { holidays, HolidaysTypes } from '../../../models/holidays.model';
import { userGroups } from '../../../models/userGroups.model';
import { users } from '../../../models/users.model';
import { HolidayStatus } from '../../database/models/holidayStatuses';

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

export const getGroupHolidaysWithNamesByTeamLeader = async (userId: string) => {
    const result = await db
        .select({
            holidayId: holidays.id,
            userId: holidays.userId,
            startDate: holidays.startDate,
            endDate: holidays.endDate,
            description: holidays.description,
            holidayType: holidays.holidayType,
            status: holidays.status,
            createdAt: holidays.createdAt,
            updatedAt: holidays.updatedAt,
            userName: users.name,
            userSurname: users.surname,
        })
        .from(holidays)
        .innerJoin(users, eq(holidays.userId, users.id))
        .innerJoin(userGroups, eq(users.id, userGroups.userId))
        .innerJoin(groups, eq(userGroups.groupId, groups.id))
        .where(eq(groups.leaderId, userId));

    return result;
};

export const getAllHolidaysWithNames = async () => {
    const result = await db
        .select({
            holidayId: holidays.id,
            userId: holidays.userId,
            startDate: holidays.startDate,
            endDate: holidays.endDate,
            description: holidays.description,
            holidayType: holidays.holidayType,
            status: holidays.status,
            createdAt: holidays.createdAt,
            updatedAt: holidays.updatedAt,
            userName: users.name,
            userSurname: users.surname,
        })
        .from(holidays)
        .innerJoin(users, eq(holidays.userId, users.id));

    return result;
};
