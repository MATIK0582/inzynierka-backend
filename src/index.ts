import 'dotenv/config';
import { AddressInfo } from 'net';

import { app } from './app';

const server = app.listen(process.env.APP_PORT, process.env.HOSTNAME || '127.0.0.1', () => {
    const { port, address } = server.address() as AddressInfo;
    return console.log(`Express server is listening at ${address}:${port} 🚀`);
});
