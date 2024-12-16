import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { addUserToGroup, insertGroup } from '../../../utils/queries/groups/groupQueries';
import { Roles } from '../../../utils/database/models/roles';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const addMember = async (userRole: Roles, userId: string, groupId: string): Promise<StatusCode> => {
    try {
        if (userRole === Roles.USER || userRole === Roles.TEAM_LEADER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to add members to group',
                'Brak uprawnień do dodawania członków grupy',
            );
        }

        const isValidUserId= uuidv4Validator(userId);
        if (!isValidUserId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified member UUID is not valid',
                'Podane UUID użytkownika nie jest poprawne',
            );
        }

        const isValidGroupId = uuidv4Validator(groupId);
        if (!isValidGroupId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified group UUID is not valid',
                'Podane UUID grupy nie jest poprawne',
            );
        }

        // @TODO: remove from other groups?
        await addUserToGroup(userId, groupId)

        return createStatusCodeResponse(HTTP_CODES.CREATED, 'Member added', 'Dodano członka grupy');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
