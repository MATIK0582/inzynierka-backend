import 'dotenv/config';

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env
export const database_url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`