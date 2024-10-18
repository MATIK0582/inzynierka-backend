import { TokenPair } from "../authorization/tokens";

export enum HTTP_CODES {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    TOO_MANY_REQUESTS = 429,
    SERVER_ERROR = 500,
}

export interface StatusCode {
    json: {
        statusCode: HTTP_CODES;
        statusMessage: string;
        message: string;
    };
}

export interface StatusCodeWithTokenPair extends StatusCode {
    tokenPair?: TokenPair;
}

type StatusCodes = {
    [S in HTTP_CODES]: StatusCode;
};

export const createStatusCodeResponse = (statusCode: number, statusMessage: string, message: string): StatusCode => {
    return {
        json: {
            statusCode: statusCode,
            statusMessage: statusMessage,
            message: message,
        },
    };
};

export const STATUS_CODES: StatusCodes = {
    200: {
        json: {
            statusCode: 200,
            statusMessage: 'OK',
            message: 'Success status response code',
        },
    },
    201: {
        json: {
            statusCode: 200,
            statusMessage: 'Created',
            message: 'Content created successfully',
        },
    },
    204: {
        json: {
            statusCode: 204,
            statusMessage: 'Deleted',
            message: 'Content deleted successfully',
        },
    },
    400: {
        json: {
            statusCode: 400,
            statusMessage: '400 Bad Request',
            message: 'Server cannot or will not process the request.',
        },
    },
    401: {
        json: {
            statusCode: 401,
            statusMessage: '401 Unauthorized',
            message: 'Invalid credentials sent.',
        },
    },
    403: {
        json: {
            statusCode: 403,
            statusMessage: '403 Forbidden',
            message: 'Invalid credentials sent.',
        },
    },
    404: {
        json: {
            statusCode: 404,
            statusMessage: '404 Not Found',
            message: "Server can't find the requested resource.",
        },
    },
    405: {
        json: {
            statusCode: 405,
            statusMessage: '405 Method Not Allowed',
            message:
                'The method specified in the Request-Line is not allowed for the resource identified by the Request-URI',
        },
    },
    429: {
        json: {
            statusCode: 429,
            statusMessage: '429 Too Many Request',
            message: 'Too many requests!',
        },
    },
    500: {
        json: {
            statusCode: 500,
            statusMessage: '500 Internal Server Error',
            message:
                'The server encountered an internal error or misconfiguration and was unable to complete your request.',
        },
    },
};
