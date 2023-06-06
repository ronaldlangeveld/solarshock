import {Router} from 'express';
import AccountsController from '../controllers/authentication/AuthenticationController';
import Server from '../Server';
// import AccountUseCaseImpl from '../../../core/accounts/use-cases/AccountUseCaseImpl';
import UserUseCaseImpl from '../../../core/accounts/use-cases/UserUseCaseImpl';

class AuthenticationRouter {
    private _router: Router;
    private _serverInstance: Server;

    constructor(serverInstance: Server) {
        this._router = Router();
        this._serverInstance = serverInstance;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const accountsController = new AccountsController(
            new UserUseCaseImpl(this._serverInstance.getUserRepository())
        );
    
        this._router
            .get('/api/users', accountsController.getUsers.bind(accountsController))
            .post('/api/users', accountsController.addUser.bind(accountsController));
    }

    public getRouter(): Router {
        return this._router;
    }
}

export default AuthenticationRouter;
