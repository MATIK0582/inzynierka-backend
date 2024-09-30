import { LogInDescription } from '../../utils/authorization/logInDescription';
import { findUserByEmail } from '../../utils/database/queries';
import { ErrorType } from '../../utils/errorHandling/errorTypes';
import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../utils/router/statusCodes';
import { comparePasswords } from '../services/password.service';
import { emailValidator } from '../validations/email.validator';

export const logIn = async ({ email, password }: LogInDescription): Promise<StatusCode> => {
    try {
        const isValidEmail = emailValidator(email);
        if (!isValidEmail) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                ErrorType.INVALID_EMAIL,
                'Podany adres e-mail nie jest poprawny',
            );
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return createStatusCodeResponse(
                HTTP_CODES.UNAUTHORIZED,
                ErrorType.INVALID_EMAIL_OR_PASSWORD,
                'Podany adres e-mail lub hasło nie jest poprawne',
            );
        }

        const arePasswordsEqual = await comparePasswords(password, user.password);
        if (!arePasswordsEqual) {
            return createStatusCodeResponse(
                HTTP_CODES.UNAUTHORIZED,
                ErrorType.INVALID_EMAIL_OR_PASSWORD,
                'Podany adres e-mail lub hasło nie jest poprawne',
            );
        }

        // @TODO: ADD JWT
        return createStatusCodeResponse(HTTP_CODES.OK, 'Ok', 'Zalogowano');
    } catch (error: any) {
        // @TODO: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
