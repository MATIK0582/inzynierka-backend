import { getGroupDataById, getGroupDataByTeamLeaderId, getUserById, getUserDataById } from '../../../../utils/queries/users/userQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../../utils/router/statusCodes';
import { uuidv4Validator } from '../../../validations/uuidv4.validator';

export const groupUsersDataTemp = async (groupId: string): Promise<StatusCode> => {
    try {
        // @FIXME: AUTH

        const groupData = await getGroupDataById(groupId);
        if (!groupData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't get data of group with provided user Id",
                'Nie można pobrać danych grupy dla podanego Id',
            );
        }

        return createStatusCodeResponse(HTTP_CODES.OK, 'Sending user data', JSON.stringify(groupData));
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
