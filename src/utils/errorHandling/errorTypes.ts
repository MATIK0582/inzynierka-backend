export enum CustomErrorType {
    INVALID_PASSWORD = 'invalid_password',
    INVALID_EMAIL = 'invalid_email',
}

export const ErrorType = {
    ...CustomErrorType
}