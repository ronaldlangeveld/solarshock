import {Router} from 'express';
import AccountsController from '../controllers/authentication/AuthenticationController';
import Server from '../Server';
import AccountUseCaseImpl from '../../../core/accounts/use-cases/AccountUseCaseImpl';
// import IAccountRepository from '../../../core/accounts/repositories/IAccountRepository';

class AuthenticationRouter {
    private router: Router;
    private accountsController: AccountsController;
    private serverInstance: Server;

    constructor(serverInstance: Server) {
        this.router = Router();
        this.serverInstance = serverInstance;
        this.initializeRoutes();
        this.accountsController = new AccountsController(new AccountUseCaseImpl(this.serverInstance.getAccountRepository()));
    }

    private initializeRoutes() {
        this.router.get('/api/accounts', this.accountsController.getAccounts);
        this.router.post('/api/accounts', this.accountsController.addAccount);
    }

    public getRouter(): Router {
        return this.router;
    }
}

// export default new AuthenticationRouter().getRouter();

export default AuthenticationRouter;
