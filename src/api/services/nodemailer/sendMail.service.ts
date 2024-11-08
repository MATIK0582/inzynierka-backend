import { transporter } from '../../../config/nodemailer/mail.config';
import { ErrorType } from '../../../utils/errorHandling/errorTypes';
import { MailOptionsTypes } from '../../../utils/nodemailer/mailOptions';
import { emailValidator } from '../../validations/email.validator';

export const sendMail = async (mailOptions: MailOptionsTypes) => {
    try {
        const isValidatedSender = emailValidator(mailOptions.from);
        if (!isValidatedSender) {
            throw new Error(ErrorType.INVALID_EMAIL);
        }

        const isValidatedReceiver = emailValidator(mailOptions.to);
        if (!isValidatedReceiver) {
            throw new Error(ErrorType.INVALID_EMAIL);
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.log('Email sending failed:', error);
    }
};
