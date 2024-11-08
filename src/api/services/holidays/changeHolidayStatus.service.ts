import { HolidayStatus } from '../../../utils/database/models/holidayStatuses';
import { Roles } from '../../../utils/database/models/roles';
import { updateHolidayStatus } from '../../../utils/queries/holidays/holidayQueries';

export const changeHolidayStatus = async (holidayId: string, userRole: Roles) => {
    if (userRole === Roles.TEAM_LEADER) {
        await updateHolidayStatus(holidayId, HolidayStatus.ACCEPTED_BY_TEAM_LEADER);
    } else if (userRole === Roles.HUMAN_RESOURCE) {
        await updateHolidayStatus(holidayId, HolidayStatus.ACCEPTED);
    } else if (userRole === Roles.ADMIN) {
        // @TODO: Consider diffrent type for admin's accept
        await updateHolidayStatus(holidayId, HolidayStatus.ACCEPTED);
    }
};
