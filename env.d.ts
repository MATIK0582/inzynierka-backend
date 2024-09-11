declare namespace NodeJS {
    export interface ProcessEnv {
        APP_PORT: number;
        HOSTNAME: string;
        DB_HOST: string;
        DB_PORT: number
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
    }
}
