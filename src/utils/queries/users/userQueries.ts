import { eq, ne } from 'drizzle-orm';

import { db } from '../../../config/config';
import { users } from '../../../models/users.model';
import { availableHolidays } from '../../../models/availableHolidays.model';
import { groups } from '../../../models/groups.model';
import { userGroups } from '../../../models/userGroups.model';
import { Roles } from '../../database/models/roles';

export const getUserByEmail = async (email: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    return user;
};

export const getUserById = async (userId: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
    });

    return user;
};

export const updateUserRole = async (userId: string, newRole: Roles) => {
    await db
        .update(users)
        .set({
            role: newRole,
        })
        .where(eq(users.id, userId));
};

export const getUserDataById = async (userId: string) => {
    const result = await db
        .select({
            userId: users.id,
            name: users.name,
            surname: users.surname,
            role: users.role,
            groupId: groups.id,
            groupName: groups.name,
            holidays: availableHolidays.holiday,
            holidaysUponRequest: availableHolidays.holidayUponRequest,
        })
        .from(users)
        .leftJoin(userGroups, eq(users.id, userGroups.userId))
        .leftJoin(groups, eq(userGroups.groupId, groups.id))
        .leftJoin(availableHolidays, eq(users.id, availableHolidays.userId))
        .where(eq(users.id, userId));

    return result[0];
};

export const getGroupDataByTeamLeaderId = async (teamLeaderId: string) => {
    const result = await db
        .select({
            userId: users.id,
            name: users.name,
            surname: users.surname,
            role: users.role,
            groupId: groups.id,
            groupName: groups.name,
            holidays: availableHolidays.holiday,
            holidaysUponRequest: availableHolidays.holidayUponRequest,
        })
        .from(users)
        .innerJoin(userGroups, eq(users.id, userGroups.userId))
        .innerJoin(groups, eq(userGroups.groupId, groups.id))
        .leftJoin(availableHolidays, eq(users.id, availableHolidays.userId))
        .where(eq(groups.leaderId, teamLeaderId));

    return result;
};

export const getGroupDataById = async (groupId: string) => {
    const result = await db
        .select({
            userId: users.id,
            name: users.name,
            surname: users.surname,
            role: users.role,
            groupId: groups.id,
            groupName: groups.name,
            holidays: availableHolidays.holiday,
            holidaysUponRequest: availableHolidays.holidayUponRequest,
        })
        .from(users)
        .innerJoin(userGroups, eq(users.id, userGroups.userId))
        .innerJoin(groups, eq(userGroups.groupId, groups.id))
        .leftJoin(availableHolidays, eq(users.id, availableHolidays.userId))
        .where(eq(groups.id, groupId));

    return result;
};

export const getAllUsersData = async () => {
    const result = await db
        .select({
            userId: users.id,
            name: users.name,
            surname: users.surname,
            role: users.role,
            groupId: groups.id,
            groupName: groups.name,
            holidays: availableHolidays.holiday,
            holidaysUponRequest: availableHolidays.holidayUponRequest,
        })
        .from(users)
        .leftJoin(userGroups, eq(users.id, userGroups.userId))
        .leftJoin(groups, eq(userGroups.groupId, groups.id))
        .leftJoin(availableHolidays, eq(users.id, availableHolidays.userId));

    return result;
};
