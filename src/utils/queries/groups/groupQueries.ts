import { sql, eq } from 'drizzle-orm';
import { db } from '../../../config/config';
import { groups, GroupsTypes } from '../../../models/groups.model';
import { userGroups } from '../../../models/userGroups.model';
import { users } from '../../../models/users.model';

export const insertGroup = async ({ name, leaderId }: GroupsTypes) => {
    const group = await db
        .insert(groups)
        .values({
            name: name,
            leaderId: leaderId,
        })
        .returning({
            id: groups.id,
        });

    return group;
};

export const addUserToGroup = async (userId: string, groupId: string) => {
    await db.insert(userGroups).values({
        userId: userId,
        groupId: groupId,
    });
};

export const getAllGroupNames = async () => {
    const result = await db
        .select({
            groupId: groups.id,
            name: groups.name,
        })
        .from(groups);

    return result;
};

export const getAllGroupsData = async () => {
  const result = await db
    .select({
      groupId: groups.id,
      groupName: groups.name,
      leaderId: groups.leaderId,
      leaderName: users.name,
      leaderSurname: users.surname,
      employeeCount: sql<number>`CAST(COUNT(${userGroups.userId}) AS INTEGER)`,
    })
    .from(groups)
    .leftJoin(users, eq(groups.leaderId, users.id))
    .leftJoin(userGroups, eq(groups.id, userGroups.groupId))
    .groupBy(groups.id, users.id);

  return result;
}
