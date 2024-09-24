import { db } from '../../config/config';
import { users, UsersTypes } from '../../models/users.model';

export const insertUser = async ({ name, surname, email, password }: UsersTypes) => {
    const user = await db
        .insert(users)
        .values({
            name: name,
            surname: surname,
            email: email,
            password: password,
        })
        .returning({
            id: users.id,
        });

    return user;
};
