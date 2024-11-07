import { UUIDv4_REGEX } from '../../utils/constants';

export const uuidv4Validator = (stringToValidate: string): boolean => {
    if (!stringToValidate || stringToValidate.length === 0) {
        return false;
    }

    const uuidv4Regex = new RegExp(UUIDv4_REGEX);

    const passesRegex: boolean = uuidv4Regex.test(stringToValidate) ? true : false;

    const isValidated: boolean = passesRegex; //&&;

    return isValidated;
};
