import 'dotenv/config';

import { HolidaysTypes } from '../../../models/holidays.model';
import { sendMail } from '../nodemailer/sendMail.service';
import { MailOptionsTypes } from '../../../utils/nodemailer/mailOptions';
import { Roles } from '../../../utils/database/models/roles';
import { getUserById } from '../../../utils/queries/users/userQueries';
import { HolidayStatusAction } from '../../../utils/database/models/holidayStatuses';

export const notifyUser = async (holidayData: HolidaysTypes, userRole: Roles, actionType: HolidayStatusAction) => {
    try {
        const petitionerData = await getUserById(holidayData.userId);
        if (!petitionerData) {
            throw new Error("DB connection failed, can't get user's email");
        }

        let mailText = '';

        if (actionType === HolidayStatusAction.ACCEPT) {
            if (userRole === Roles.TEAM_LEADER) {
                mailText = 'Urlop został zaakceptowany przez leadera zespołu';
            } else if (userRole === Roles.HUMAN_RESOURCE) {
                mailText = 'Urlop został zaakceptowany. Miłego wypoczynku';
            } else if (userRole === Roles.ADMIN) {
                mailText = 'Urlop został zaakceptowany przez administratora. Miłego wypoczynku';
            }
        } else if (actionType === HolidayStatusAction.REJECT) {
            mailText = 'Urlop został odrzucony. W razie pytań skontaktuj się z działem kadr';
        }

        const otpions: MailOptionsTypes = {
            from: process.env.MAIL_PROVIDER_ADDRESS,
            to: petitionerData.email,
            subject:
                holidayData.startDate === holidayData.endDate
                    ? `Wniosek urlopowy ${holidayData.startDate}`
                    : `Wniosek urlopowy ${holidayData.startDate} - ${holidayData.endDate}`,
            text: mailText,
        };

        await sendMail(otpions);
    } catch (error) {
        console.log('User notify failed:', error);
    }
};
