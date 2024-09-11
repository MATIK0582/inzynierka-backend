import { uuid, timestamp, pgTable, pgEnum, varchar, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.model';
import { Statuses } from '../utils/database/models/statuses';
import { HolidayType } from '../utils/database/models/holidayTypes';
import { enumToPgEnum } from '../utils/database/enums';
import { MAX_DESCRIPTION_LENGTH } from '../config/constants';

export const statusEnum = pgEnum('status', enumToPgEnum(Statuses));
export const holidayTypeEnum = pgEnum('holiday_type', enumToPgEnum(HolidayType));

export const holidays = pgTable('holidays', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id)
        .notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    desciption: varchar('desciption', { length: MAX_DESCRIPTION_LENGTH }).notNull(),
    holidayType: holidayTypeEnum('holiday_type').notNull(),
    status: statusEnum('status').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const holidaysRelations = relations(holidays, ({ one }) => ({
    user: one(users, {
        fields: [holidays.userId],
        references: [users.id],
    }),
}));
