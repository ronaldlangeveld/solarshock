import {Router} from 'express';
import AccountsController from '../controllers/authentication/AuthenticationController';
import Server from '../Server';
import AccountUseCaseImpl from '../../../core/accounts/use-cases/AccountUseCaseImpl';

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
            new AccountUseCaseImpl(this._serverInstance.getAccountRepository())
        );
    
        this._router
            .get('/api/accounts', accountsController.getAccounts.bind(accountsController))
            .post('/api/accounts', accountsController.addAccount.bind(accountsController));
    }

    public getRouter(): Router {
        return this._router;
    }
}

export default AuthenticationRouter;
