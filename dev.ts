import * as dotenv from 'dotenv';
dotenv.config();

import {startServer} from '@solarshock/solarshock-api';

const args = process.argv;

if (args.includes('--api')) {
    startServer();
}

export {startServer};
