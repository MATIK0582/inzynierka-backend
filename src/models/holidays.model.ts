import { uuid, timestamp, pgTable, pgEnum, varchar, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.model';
import { HolidayStatus } from '../utils/database/models/holidayStatuses';
import { HolidayType } from '../utils/database/models/holidayTypes';
import { enumToPgEnum } from '../utils/database/enums';
import { MAX_DESCRIPTION_LENGTH } from '../utils/constants';

export const holidayStatusEnum = pgEnum('status', enumToPgEnum(HolidayStatus));
export const holidayTypeEnum = pgEnum('holiday_type', enumToPgEnum(HolidayType));

export const holidays = pgTable('holidays', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    description: varchar('description', { length: MAX_DESCRIPTION_LENGTH }),
    holidayType: holidayTypeEnum('holiday_type').notNull(),
    status: holidayStatusEnum('status').default(HolidayStatus.PENDING).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

export type HolidaysTypes = typeof holidays.$inferInsert;

export const holidaysRelations = relations(holidays, ({ one }) => ({
    user: one(users, {
        fields: [holidays.userId],
        references: [users.id],
    }),
}));
