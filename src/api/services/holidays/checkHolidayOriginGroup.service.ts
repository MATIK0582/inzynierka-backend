import { eq, and } from 'drizzle-orm';

import { db } from '../../../config/config';
import { groups } from '../../../models/groups.model';
import { holidays } from '../../../models/holidays.model';
import { userGroups } from '../../../models/userGroups.model';
import { users } from '../../../models/users.model';

export const isHolidayFromUserInTeamLeadersGroup = async (holidayId: string, teamLeaderId: string) => {
    const result = await db
        .select()
        .from(holidays)
        .innerJoin(users, eq(holidays.userId, users.id))
        .innerJoin(userGroups, eq(users.id, userGroups.userId))
        .innerJoin(groups, and(eq(userGroups.groupId, groups.id), eq(groups.leaderId, teamLeaderId)))
        .where(eq(holidays.id, holidayId))
        .limit(1);
    return result.length > 0;
};
