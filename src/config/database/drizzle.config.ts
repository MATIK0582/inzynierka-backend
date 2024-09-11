import { defineConfig } from 'drizzle-kit';
import postgres from 'postgres';

import { database_url } from '../../utils/database/url';

export const migrationClient = postgres(database_url, { max: 1 });

export default defineConfig({
    schema: './src/models/*.ts',
    out: './src/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: database_url,
    },
    verbose: true,
    strict: true,
});
