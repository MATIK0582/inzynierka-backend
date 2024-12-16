import { uuid, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.model';
import { userGroups } from './userGroups.model';
import { MAX_GROUP_NAME_LENGTH } from '../utils/constants';

export const groups = pgTable('groups', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: MAX_GROUP_NAME_LENGTH }).notNull(),
    leaderId: uuid('leader_id')
        .references(() => users.id)
        .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export type GroupsTypes = typeof groups.$inferInsert;

export const groupsRelations = relations(groups, ({ one, many }) => ({
    user: one(users, {
        fields: [groups.leaderId],
        references: [users.id],
    }),
    userGroups: many(userGroups),
}));
