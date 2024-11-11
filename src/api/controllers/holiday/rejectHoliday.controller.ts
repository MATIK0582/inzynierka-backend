import { HolidayStatus, HolidayStatusAction } from '../../../utils/database/models/holidayStatuses';
import { Roles } from '../../../utils/database/models/roles';
import { getHolidayById } from '../../../utils/queries/holidays/holidayQueries';
import { StatusCode, createStatusCodeResponse, HTTP_CODES } from '../../../utils/router/statusCodes';
import { changeHolidayStatus } from '../../services/holidays/changeHolidayStatus.service';
import { notifyUser } from '../../services/holidays/notifyUser.service';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const rejectHoliday = async (holidayId: string, userId: string, userRole: Roles): Promise<StatusCode> => {
    try {
        if (userRole === Roles.USER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to reject holidays',
                'Brak uprawnień do odrzucania urlopów',
            );
        }

        const isValidHolidayId = uuidv4Validator(holidayId);
        if (!isValidHolidayId) {
            return createStatusCodeResponse(
                HTTP_CODES.BAD_REQUEST,
                'Specified UUID is not valid',
                'Podane UUID urlopu nie jest poprawne',
            );
        }

        const holidayData = await getHolidayById(holidayId);
        if (!holidayData) {
            return createStatusCodeResponse(
                HTTP_CODES.NOT_FOUND,
                "Can't find holiday with provided Id",
                'Nie znaleziono urlopu o podanym Id',
            );
        }

        // Reject if role == admin?
        if (holidayData.userId === userId) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to reject your own holidays',
                'Brak uprawnień do odrzucenia własnych urlopów',
            );
        }

        if (holidayData.status === HolidayStatus.REJECTED) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Holiday request already rejected',
                'Wniosek urlopowy jest już odrzucony',
            );
        }

        // @TODO: Test when groups will be available
        // if (userRole === Roles.TEAM_LEADER) {
        //     if (!(await isHolidayFromUserInTeamLeadersGroup(holidayId, userId))) {
        //         return createStatusCodeResponse(
        //             HTTP_CODES.FORBIDDEN,
        //             'Not authorized to reject this holiday',
        //             'Brak uprawnień do odrzucenia tego urlopu',
        //         );
        //     }
        // }

        await changeHolidayStatus(holidayId, userRole, HolidayStatusAction.REJECT);

        notifyUser(holidayData, userRole, HolidayStatusAction.REJECT);

        return createStatusCodeResponse(HTTP_CODES.OK, 'Holiday rejected', 'Odrzucono wniosek o urlop');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
