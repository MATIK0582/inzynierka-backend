import { uuid, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.model';
import { groups } from './groups.model';

export const userGroups = pgTable('user_groups', {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        groupId: uuid('group_id')
            .notNull()
            .references(() => groups.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.groupId] }),
    }),
);

export const usersToGroupsRelations = relations(userGroups, ({ one }) => ({
    user: one(users, {
        fields: [userGroups.userId],
        references: [users.id],
    }),
    group: one(groups, {
        fields: [userGroups.groupId],
        references: [groups.id],
    }),
}));
