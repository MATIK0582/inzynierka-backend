import bcrypt from 'bcrypt';

import { SALT } from '../../utils/constants';

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT);
};

export const comparePasswords = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};
