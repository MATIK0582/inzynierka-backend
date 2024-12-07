import { Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { addHoliday } from '../../../controllers/holiday/addHoliday.controller';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';
import { HolidaysTypes } from '../../../../models/holidays.model';
import { AuthenticatedRequest } from '../../../../utils/router/requestDescription';
import { deleteHoliday } from '../../../controllers/holiday/deleteHoliday.controller';
import { acceptHoliday } from '../../../controllers/holiday/acceptHoliday.controller';
import { rejectHoliday } from '../../../controllers/holiday/rejectHoliday.controller';

const addHolidayPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;

    const { startDate, endDate, description, holidayType }: HolidaysTypes = req.body;

    const response = await addHoliday({ userId, startDate, endDate, description, holidayType });

    res.status(response.json.statusCode).json(response.json);

    return;
};

const deleteHolidayDelete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const { holidayId } = req.body;

    const response = await deleteHoliday(userId, holidayId);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const acceptHolidayPut = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { holidayId } = req.body;

    const response = await acceptHoliday(holidayId, userId, userRole);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const rejectHolidayPut = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { holidayId } = req.body;

    const response = await rejectHoliday(holidayId, userId, userRole);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ADD_HOLIDAY_POST_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.POST,
    url: '/holiday/add',
    handler: addHolidayPost,
    middlewares: [verifyAccessToken],
};

const DELETE_HOLIDAY_DELETE_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.DELETE,
    url: '/holiday/delete',
    handler: deleteHolidayDelete,
    middlewares: [verifyAccessToken],
};

const ACCEPT_HOLIDAY_PUT_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.PUT,
    url: '/holiday/accept',
    handler: acceptHolidayPut,
    middlewares: [verifyAccessToken],
};

const REJECT_HOLIDAY_PUT_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.PUT,
    url: '/holiday/reject',
    handler: rejectHolidayPut,
    middlewares: [verifyAccessToken],
};

export default [
    ADD_HOLIDAY_POST_ROUTE,
    DELETE_HOLIDAY_DELETE_ROUTE,
    ACCEPT_HOLIDAY_PUT_ROUTE,
    REJECT_HOLIDAY_PUT_ROUTE,
];
