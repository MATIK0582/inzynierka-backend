import { PASSWORD_REGEX } from '../../utils/constants';

export const passwordValidator = (stringToValidate: string): boolean => {
    if (!stringToValidate || stringToValidate.length === 0) {
        return false;
    }

    // Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,
    // one special character, no space, and it must be 8-32 characters long.
    const passwordRegex = new RegExp(PASSWORD_REGEX);

    const passesRegex: boolean = passwordRegex.test(stringToValidate) ? true : false;

    const isValidated: boolean = passesRegex;

    return isValidated;
};
