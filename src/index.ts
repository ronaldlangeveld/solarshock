import * as dotenv from 'dotenv';
dotenv.config();

import APIServer from './presentation/api/index';

const args = process.argv;

async function startServer() {
    const server = new APIServer();
    await server.start();
}

if (args.includes('--api')) {
    startServer();
}

export {startServer};
