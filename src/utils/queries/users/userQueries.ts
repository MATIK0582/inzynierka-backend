import { eq } from 'drizzle-orm';

import { db } from '../../../config/config';
import { users } from '../../../models/users.model';

export const findUserByEmail = async (email: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    });
    
    return user;
};

export const findUserById = async (userId: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
    });
    
    return user;
};