import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { addUserToGroup, insertGroup } from '../../../utils/queries/groups/groupQueries';
import { updateUserRole } from '../../../utils/queries/users/userQueries';
import { Roles } from '../../../utils/database/models/roles';
import { validateRepeatedName } from '../../validations/groups.validator';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const addGroup = async (userRole: Roles, name: string, leaderId: string): Promise<StatusCode> => {
    
    console.log(userRole, name, leaderId);

    try {
        if (userRole === Roles.USER || userRole === Roles.TEAM_LEADER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to create groups',
                'Brak uprawnień do tworzenia grup',
            );
        }

        const isValidLeaderId = uuidv4Validator(leaderId);
        if (!isValidLeaderId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified team leader UUID is not valid',
                'Podane UUID lidera zespołu nie jest poprawne',
            );
        }

        const isRepeatedName = await validateRepeatedName(name);
        if (isRepeatedName) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Other group already exists with that name',
                'Istnieje już grupa o takiej nazwie',
            );
        }

        const groupData = await insertGroup({ name, leaderId });

        // @TODO: remove from other groups?
        await addUserToGroup(leaderId, groupData[0].id)

        await updateUserRole(leaderId, Roles.TEAM_LEADER);

        return createStatusCodeResponse(HTTP_CODES.CREATED, 'Group added', 'Dodano grupe');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
