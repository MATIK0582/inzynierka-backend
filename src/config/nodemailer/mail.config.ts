import 'dotenv/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: process.env.MAIL_PROVIDER,
    auth: {
        user: process.env.MAIL_PROVIDER_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
    },
});
