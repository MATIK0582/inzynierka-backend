export enum CustomErrorType {
    INVALID_PASSWORD = 'invalid_password',
    INVALID_EMAIL = 'invalid_email',
    INVALID_EMAIL_OR_PASSWORD = 'invalid_email_or_password',
    MISSING_TOKEN = 'missing_token'
}

export const ErrorType = {
    ...CustomErrorType,
};
