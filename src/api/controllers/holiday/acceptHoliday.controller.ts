import { notifyUser } from '../../services/holidays/notifyUser.service';
import { changeHolidayStatus } from '../../services/holidays/changeHolidayStatus.service';
import { createStatusCodeResponse, HTTP_CODES, StatusCode } from '../../../utils/router/statusCodes';
import { Roles } from '../../../utils/database/models/roles';
import { HolidayStatus } from '../../../utils/database/models/holidayStatuses';
import { getHolidayById } from '../../../utils/queries/holidays/holidayQueries';
import { uuidv4Validator } from '../../validations/uuidv4.validator';

export const acceptHoliday = async (holidayId: string, userId: string, userRole: Roles): Promise<StatusCode> => {
    try {
        if (userRole === Roles.USER) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to accept holidays',
                'Brak uprawnień do akceptacji urlopów',
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

        // Accept if role == admin?
        if (holidayData.userId === userId) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Not authorized to accept your own holidays',
                'Brak uprawnień do akceptacji własnych urlopów',
            );
        }

        if (holidayData.status === HolidayStatus.ACCEPTED) {
            return createStatusCodeResponse(
                HTTP_CODES.FORBIDDEN,
                'Holiday request already accepted',
                'Wniosek urlopowy jest już zaakcpetowany',
            );
        }

        // @TODO: Test when groups will be available
        // if (userRole === Roles.TEAM_LEADER) {
        //     if (!(await isHolidayFromUserInTeamLeadersGroup(holidayId, userId))) {
        //         return createStatusCodeResponse(
        //             HTTP_CODES.FORBIDDEN,
        //             'Not authorized to accept this holiday',
        //             'Brak uprawnień do akceptacji tego urlopów',
        //         );
        //     }
        // }

        await changeHolidayStatus(holidayId, userRole);

        notifyUser(holidayData, userRole);

        return createStatusCodeResponse(HTTP_CODES.OK, 'Holiday accepted', 'Zaakceptowano wniosek o urlop');
    } catch (error: any) {
        // @FIXME: ADD PROPER ERROR HANDLING
        console.log(error);
        if (error.code && error.type) {
            return createStatusCodeResponse(error.code, error.type, 'Coś proszło nie tak');
        }

        return createStatusCodeResponse(HTTP_CODES.BAD_REQUEST, 'unhandled_error', 'Podano błędne dane!');
    }
};
