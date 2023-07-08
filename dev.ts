import * as dotenv from 'dotenv';
dotenv.config();

import {startServer as API} from '@solarshock/solarshock-api';

const args = process.argv;

if (args.includes('--api')) {
    API();
}

export {API};
