/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import IAccountUseCase from '../../../../core/accounts/use-cases/IAccountUseCase';
import Account from '../../../../core/accounts/entities/Account';

export interface IAccountsController {
    getAccounts(req: Request, res: Response): Promise<void>;
    addAccount(req: Request, res: Response): Promise<void>;
}

class AccountsController implements IAccountsController {
    private _accountUseCase: IAccountUseCase;

    constructor(accountUseCase: IAccountUseCase) {
        this._accountUseCase = accountUseCase;
    }

    async getAccounts(req: Request, res: Response) {
        try {
            const accounts = await this._accountUseCase.findAllAccounts();
            res.json(accounts);
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async addAccount(req: Request, res: Response) {
        const {name} = req.body;
        const account = await Account.create({
            name: name
        });
        try {
            const createdAccount = await this._accountUseCase.createAccount(account);
            res.json(createdAccount);
        } catch (e:any) {
            res.status(400).json({error: e.message});
        }
    }
}

export default AccountsController;
