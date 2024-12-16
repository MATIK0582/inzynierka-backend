import { db } from '../../../config/config';
import { groups, GroupsTypes } from '../../../models/groups.model';
import { userGroups } from '../../../models/userGroups.model';

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
