import { LogInDescription } from '../../../utils/authorization/logInDescription';
import { ActionType } from '../../../utils/authorization/tokens';
import { getUserByEmail } from '../../../utils/queries/users/userQueries';
import { ErrorType } from '../../../utils/errorHandling/errorTypes';
import { createStatusCodeResponse, HTTP_CODES, StatusCodeWithTokenPair } from '../../../utils/router/statusCodes';
import { generateTokenPair } from '../../services/jwt.service';
import { comparePasswords } from '../../services/password.service';
import { emailValidator } from '../../validations/email.validator';

export const logIn = async ({ email, password }: LogInDescription): Promise<StatusCodeWithTokenPair> => {
    try {
        const isValidEmail = emailValidator(email);
        if (!isValidEmail) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                ErrorType.INVALID_EMAIL,
                'Podany adres e-mail nie jest poprawny',
            );
        }

        const user = await getUserByEmail(email);
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

        const tokenPair = await generateTokenPair(user.id, ActionType.LOG_IN);
        // @FIXME: BETTER ERROR FOR JTW FAIL
        if (!tokenPair) {
            return createStatusCodeResponse(HTTP_CODES.SERVER_ERROR, 'SERVER ERROR', 'Coś proszło nie tak');
        }

        return {
            ...createStatusCodeResponse(HTTP_CODES.OK, 'Successfully loged in', 'Zalogowano'),
            tokenPair,
        };
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
