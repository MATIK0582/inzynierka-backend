import { defineConfig } from 'drizzle-kit';

import { database_url } from '../../utils/constants';

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
