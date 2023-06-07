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
        try {
            const users = await User.create(req.body);
            const createdAccount = await this._userUseCase.createUser(users);
            res.json(createdAccount);
        } catch (e:any) {
            res.status(400).json({error: e.message});
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const user = await this._userUseCase.findUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            if (req.body.email) {
                user.email = req.body.email;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            if (req.body.firstName) {
                user.firstName = req.body.firstName;
            }

            if (req.body.lastName) {
                user.lastName = req.body.lastName;
            }

            if (req.body.role) {
                user.role = req.body.role;
            }

            if (req.body.status) {
                user.status = req.body.status;
            }

            const updatedAccount = await this._userUseCase.updateUser(user);
            res.json(updatedAccount);
        } catch (e:any) {
            res.status(400).json({error: e.message});
        }
    }
}

export default AccountsController;
