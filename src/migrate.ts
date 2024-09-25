import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { migrationClient } from './config/config';

const main = async () => {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: './src/migrations',
    });

    await migrationClient.end();
};

main();
