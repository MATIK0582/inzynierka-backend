import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../../utils/router/statusCodes';
import { Roles } from '../../../../utils/database/models/roles';
import { getAllGroupsData } from '../../../../utils/queries/groups/groupQueries';

export const allGroups = async (userRole: Roles): Promise<StatusCode> => {
    try {
        // if (userRole === Roles.USER || userRole === Roles.TEAM_LEADER) {
        if (userRole === Roles.USER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to preview groups',
                'Brak uprawnień do przeglądania grup',
            );
        }

        const groupsData = await getAllGroupsData();
        if (!groupsData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find groups in DB",
                'Nie znaleziono grup w bazie danych',
            );
        }

        return createStatusCodeResponse(HTTP_CODES.OK, 'Sending holidays data', JSON.stringify(groupsData));
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
