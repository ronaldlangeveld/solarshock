import {Router} from 'express';
import {Server} from '../server';
import {AccountsController} from '../controllers/authentication/AuthenticationController';
import {UserServiceImpl} from '@solarshock/solarshock-core';

export class AuthenticationRouter {
    private _router: Router;
    private _serverInstance: Server;

    constructor(serverInstance: Server) {
        this._router = Router();
        this._serverInstance = serverInstance;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const accountsController = new AccountsController(
            new UserServiceImpl(this._serverInstance.getUserRepository())
        );
    
        this._router
            .get('/api/users', accountsController.getUsers.bind(accountsController))
            .post('/api/users', accountsController.addUser.bind(accountsController))
            .put('/api/users/:userId', accountsController.updateUser.bind(accountsController));
    }

    public getRouter(): Router {
        return this._router;
    }
}
