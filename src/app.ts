import express, { type Express } from 'express';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { router } from './api/routes';
import { migrationClient } from './config/database/drizzle.config';

export const app: Express = express();

app.use('/', router);

// migrate(drizzle(migrationClient), {
//     migrationsFolder: './src/migrations'
// })
