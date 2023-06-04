import express from 'express';
import Server from './Server';
import {
    AuthenticationRouter
} from './routes/index';

import {InMemoryAccountRepository} from '../../infrastructure/data/Memory/InMemoryRepisitories';

class APIServer {
    private app: express.Application;
    private serverInstance: Server;

    constructor() {
        console.log('Starting API server'); //eslint-disable-line
        this.app = express();
        this.serverInstance = new Server({
            app: this.app,
            port: 3000,
            accountRepository: new InMemoryAccountRepository()
        });

        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware() {
        this.app.use(express.json());
    }

    private setupRoutes() {
        const routers = [
            new AuthenticationRouter(this.serverInstance)
        ];

        routers.forEach((router) => {
            this.app.use(router.getRouter());
        });
    }

    async start() {
        this.serverInstance.start();
    }
}

export default APIServer;
