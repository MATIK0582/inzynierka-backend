import { Request, Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { addHoliday } from '../../../controllers/holiday/addHoliday.controller';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';
import { HolidaysTypes } from '../../../../models/holidays.model';
import { AuthenticatedRequest } from '../../../../utils/router/requestDescription';

const addHolidayPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user.id;

    const { startDate, endDate, desciption, holidayType }: HolidaysTypes = req.body;

    const response = await addHoliday({ userId, startDate, endDate, desciption, holidayType });

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ADD_HOLIDAY_POST_ROUTE: RouteDescription<AuthenticatedRequest> = {
    method: HttpMethod.POST,
    url: '/holiday/add',
    handler: addHolidayPost,
    middlewares: [verifyAccessToken],
};

export default [ADD_HOLIDAY_POST_ROUTE];
