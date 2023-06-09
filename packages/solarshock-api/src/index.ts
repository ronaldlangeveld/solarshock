import {APIServer} from './server';

export async function startServer() {
    const server = new APIServer();
    await server.start();
}
