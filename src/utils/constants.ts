import 'dotenv/config';

export const MAX_NAME_LENGTH = 20;

export const MAX_SURNAME_LENGTH = 20;

export const MAX_EMAIL_LENGTH = 320;

export const MAX_PASSWORD_LENGTH = 255;

export const MAX_GROUP_NAME_LENGTH = 50;

export const MAX_DESCRIPTION_LENGTH = 255;

export const DEFAULT_AVAILABLE_HOLIDAYS = 26;

export const DEFAULT_AVAILABLE_HOLIDAYS_UPON_REQUEST = 4;

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env
export const database_url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/

