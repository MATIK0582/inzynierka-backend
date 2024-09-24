import { EMAIL_REGEX } from '../../utils/constants';

export const emailValidator = (stringToValidate: string): boolean => {
    if (!stringToValidate || stringToValidate.length === 0) {
        return false;
    }

    const emailRegex = new RegExp(EMAIL_REGEX);

    const passesRegex: boolean = emailRegex.test(stringToValidate) ? true : false;

    // An email address can have a total length of 320 characters.
    const isAtMost320Characters: boolean = stringToValidate.length < 320;

    const isValidated: boolean = passesRegex && isAtMost320Characters;

    return isValidated;
};
