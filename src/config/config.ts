import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import * as usersModel from '../models/users.model';
import * as groupsModel from '../models/groups.model';
import * as holidaysModel from '../models/holidays.model';
import * as availableHolidaysModel from '../models/availableHolidays.model';
import * as userGroupsModel from '../models/userGroups.model';
import * as refreshTokens from '../models/refreshTokens.model';
import { database_url } from '../utils/constants';

export const migrationClient = postgres(database_url, { max: 1 });

export const queryClient = postgres(database_url);
export const db = drizzle(queryClient, {
    schema: {
        ...usersModel,
        ...groupsModel,
        ...holidaysModel,
        ...availableHolidaysModel,
        ...userGroupsModel,
        ...refreshTokens,
    },
    logger: true,
});
