/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
// import IUserUseCase from '../../../../core/accounts/use-cases/IAccountUseCase';
// import Account from '../../../../core/accounts/entities/Account';
import IUserUseCase from '../../../../core/accounts/use-cases/IUserUseCase';
import User from '../../../../core/accounts/entities/User';

export interface IAccountsController {
    getUsers(req: Request, res: Response): Promise<void>;
    addUser(req: Request, res: Response): Promise<void>;
}

class AccountsController implements IAccountsController {
    private _userUseCase: IUserUseCase;

    constructor(userUseCase: IUserUseCase) {
        this._userUseCase = userUseCase;
    }

    async getUsers(req: Request, res: Response) {
        try {
            const accounts = await this._userUseCase.findAllUsers();
            res.json(accounts);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async addUser(req: Request, res: Response) {
        const users = await User.create(req.body);
        try {
            const createdAccount = await this._userUseCase.createUser(users);
            res.json(createdAccount);
        } catch (e:any) {
            res.status(400).json({error: e.message});
        }
    }
}

export default AccountsController;
