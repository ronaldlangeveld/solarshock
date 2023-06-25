import {Router} from 'express';
import {Server} from '../server';
import {AccountsController} from '../controllers/accounts/AccountsController';
import {UserServiceImpl} from '@solarshock/solarshock-core';
import {AuthenticationService} from '@solarshock/authentication';
import {AuthenticationMiddleware} from '../middleware/AuthenticationMiddleware';

export class AccountsRouter {
    private _router: Router;
    private _serverInstance: Server;
    private _authenticationService: AuthenticationService;
    private _UserServiceImpl: UserServiceImpl;
    // private _authenticationMiddleware: AuthenticationMiddleware;

    constructor(serverInstance: Server) {
        this._router = Router();
        this._serverInstance = serverInstance;
        this._authenticationService = new AuthenticationService(this._serverInstance.getAuthenticationRepository());
        this._UserServiceImpl = new UserServiceImpl(this._serverInstance.getUserRepository());
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const accountsController = new AccountsController(
            this._UserServiceImpl,
            this._authenticationService
        );

        const authenticationMiddleware = new AuthenticationMiddleware(this._authenticationService, this._UserServiceImpl);
    
        this._router
            .get('/api/users', 
                authenticationMiddleware.authenticate.bind(authenticationMiddleware),
                authenticationMiddleware.userIsAdmin.bind(authenticationMiddleware),
                accountsController.getUsers.bind(accountsController))
            .post('/api/users', accountsController.addUser.bind(accountsController))
            .put('/api/users/:userId', 
                authenticationMiddleware.authenticate.bind(authenticationMiddleware),
                authenticationMiddleware.userIsAdmin.bind(authenticationMiddleware),
                accountsController.updateUser.bind(accountsController))
            .post('/api/users/authenticate', accountsController.authenticateUser.bind(accountsController));
    }

    public getRouter(): Router {
        return this._router;
    }
}
