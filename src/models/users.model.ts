import { uuid, timestamp, pgTable, pgEnum, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { holidays } from './holidays.model';
import { availableHolidays } from './availableHolidays.model';
import { Roles } from '../utils/database/models/roles';
import { enumToPgEnum } from '../utils/database/enums';
import { MAX_EMAIL_LENGTH, MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH, MAX_SURNAME_LENGTH } from '../utils/constants';

export const roleEnum = pgEnum('role', enumToPgEnum(Roles));

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: MAX_NAME_LENGTH }).notNull(),
    surname: varchar('surname', { length: MAX_SURNAME_LENGTH }).notNull(),
    email: varchar('email', { length: MAX_EMAIL_LENGTH }).unique().notNull(),
    password: varchar('password', { length: MAX_PASSWORD_LENGTH }).notNull(),
    role: roleEnum('role').default(Roles.USER).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type UsersTypes = typeof users.$inferInsert;

export const usersRelations = relations(users, ({ one, many }) => ({
    availableHolidays: one(availableHolidays),
    holidays: many(holidays),
}));
