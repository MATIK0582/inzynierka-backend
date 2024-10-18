import { uuid, pgTable, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

import { MAX_TOKEN_LENGHT } from '../utils/constants';

export const refreshTokens = pgTable('refresh_tokens', {
    id: uuid('id').defaultRandom().primaryKey(),
    refreshToken: varchar('refresh_token', { length: MAX_TOKEN_LENGHT }).notNull(),
    // TODO: consider null as token from login origin
    parentToken: varchar('parent_token', { length: MAX_TOKEN_LENGHT }).notNull(), 
    used: boolean('used').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});
