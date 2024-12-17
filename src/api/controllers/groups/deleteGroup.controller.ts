import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import {
    addUserToGroup,
    deleteGroupFromDB,
    deleteUsersFromGroup,
    getGroupById,
    insertGroup,
} from '../../../utils/queries/groups/groupQueries';
import { getUserById, updateUserRole } from '../../../utils/queries/users/userQueries';
import { Roles } from '../../../utils/database/models/roles';
import { validateRepeatedName } from '../../validations/groups.validator';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const deleteGroup = async (userRole: Roles, groupId: string): Promise<StatusCode> => {
    try {
        if (userRole === Roles.USER || userRole === Roles.TEAM_LEADER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to delete groups',
                'Brak uprawnień do delete grup',
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

        const groupData = await getGroupById(groupId);
        if (!groupData) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                "Can't find group with specified Id",
                'Nie znaleziono grupy o padanym Id',
            );
        }

        await deleteUsersFromGroup(groupData.id);

        await deleteGroupFromDB(groupId);

        if (groupData.leaderId) {
            const leaderData = await getUserById(groupData.leaderId);

            if (leaderData) {
                if (leaderData.role === Roles.TEAM_LEADER) {
                    await updateUserRole(leaderData.id, Roles.USER);
                }
            }
        }

        return createStatusCodeResponse(HTTP_CODES.CREATED, 'Group deleted', 'Usunięto grupe');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
