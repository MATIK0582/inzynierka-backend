import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { addUserToGroup, insertGroup, removeUserFromGroup } from '../../../utils/queries/groups/groupQueries';
import { Roles } from '../../../utils/database/models/roles';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const removeMember = async (userRole: Roles, userId: string, groupId: string): Promise<StatusCode> => {
    try {
        if (userRole === Roles.USER || userRole === Roles.TEAM_LEADER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to delete members from group',
                'Brak uprawnień do usuwania członków grupy',
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

        await removeUserFromGroup(userId, groupId)

        return createStatusCodeResponse(HTTP_CODES.CREATED, 'Member removed', 'Usunięto członka grupy');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
