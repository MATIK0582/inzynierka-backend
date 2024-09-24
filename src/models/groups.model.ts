import { uuid, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users.model';
import { MAX_GROUP_NAME_LENGTH } from '../utils/constants';

// @FIXME: Need further investigation
export const groups = pgTable('groups', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: MAX_GROUP_NAME_LENGTH }).notNull(),
    leaderId: uuid('leader_id')
        .references(() => users.id)
        .notNull(),
    // memberId: uuid('member_id')
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
