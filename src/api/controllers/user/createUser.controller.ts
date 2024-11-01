import { UsersTypes } from '../../../models/users.model';
import { ErrorType } from '../../../utils/errorHandling/errorTypes';
import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { insertUser } from '../../services/insertUser.service';
import { hashPassword } from '../../services/password.service';
import { emailValidator } from '../../validations/email.validator';
import { passwordValidator } from '../../validations/password.validator';

export const createUser = async ({ name, surname, email, password }: UsersTypes): Promise<StatusCode> => {
    try {
        const isValidEmail = emailValidator(email);

        if (!isValidEmail) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                ErrorType.INVALID_EMAIL,
                'Podany adres e-mail nie jest poprawny',
            );
        }

        const isValidPassword = passwordValidator(password);

        if (!isValidPassword) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                ErrorType.INVALID_PASSWORD,
                'Podane hasło nie spełnia wymagań! Hasło musi składać się z min. 8 znaków - wielkich liter, małych liter, liczb oraz znaku specjalnego.',
            );
        }

        const hash = await hashPassword(password);

        const user = await insertUser({ name, surname, email, password: hash });

        return createStatusCodeResponse(
            HTTP_CODES.CREATED,
            'account_created',
            `Zarejestrowano użytkownika o id ${user[0].id}`,
        );
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
