import { uuid, timestamp, pgTable, smallint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.model';
import { DEFAULT_AVAILABLE_HOLIDAYS, DEFAULT_AVAILABLE_HOLIDAYS_UPON_REQUEST } from '../config/constants';

export const availableHolidays = pgTable('available_holidays', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    holiday: smallint('holiday').default(DEFAULT_AVAILABLE_HOLIDAYS),
    holidayUponRequest: smallint('holiday_upon_request').default(DEFAULT_AVAILABLE_HOLIDAYS_UPON_REQUEST),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const availableHolidaysRelations = relations(availableHolidays, ({ one }) => ({
    user: one(users, {
        fields: [availableHolidays.userId],
        references: [users.id],
    }),
}));