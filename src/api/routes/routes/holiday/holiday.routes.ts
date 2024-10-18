import { Request, Response } from 'express';

import { RouteDescription } from '../../../../utils/router/routeDescription';
import { HttpMethod } from '../../../../utils/router/httpMethods';
import { addHoliday } from '../../../controllers/holiday/addHoliday.controller';
import { verifyAccessToken } from '../../../middlewares/auth/jwt.middleware';

const addHolidayPost = async (req: Request, res: Response): Promise<void> => {
    const { test } = req.body;

    const response = await addHoliday(test);

    res.status(response.json.statusCode).json(response.json);

    return;
};

const ADD_HOLIDAY_POST_ROUTE: RouteDescription = {
    method: HttpMethod.POST,
    url: '/holiday/add',
    handler: addHolidayPost,
    middlewares: [verifyAccessToken],
};

export default [ADD_HOLIDAY_POST_ROUTE];
