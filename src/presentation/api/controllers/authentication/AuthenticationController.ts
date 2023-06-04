/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
// import IAccountRepository from '../../../../core/accounts/repositories/IAccountRepository';
import IAccountUseCase from '../../../../core/accounts/use-cases/IAccountUseCase';
import Account from '../../../../core/accounts/entities/Account';

class AccountsController {
    private accountUseCase: IAccountUseCase;

    constructor(accountUseCase: IAccountUseCase) {
        this.accountUseCase = accountUseCase;
    }

    async getAccounts(req: Request, res: Response) {
        res.json({message: 'hello from the class controller'});
    }

    async addAccount(req: Request, res: Response) {
        const {name} = req.body;
        const account = await Account.create({
            name: name
        });
        try {
            const createdAccount = await this.accountUseCase.createAccount(account);
            console.log(createdAccount);
            res.json(createdAccount);
        } catch (e:any) {
            console.error(e);
            res.status(400).json({error: e});
        }
    }
}

export default AccountsController;
