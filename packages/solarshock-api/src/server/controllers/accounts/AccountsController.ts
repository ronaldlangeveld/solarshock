/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import {IUserService, User} from '@solarshock/solarshock-core';
import {IAuthenticationService} from '@solarshock/authentication';

export interface IAccountsController {
    getUsers(req: Request, res: Response): Promise<void>;
    addUser(req: Request, res: Response): Promise<void>;
    authenticateUser(req: Request, res: Response): Promise<void>;
}

export class AccountsController implements IAccountsController{
    private _userUseCase: IUserService;
    private _authenticationService: IAuthenticationService;

    constructor(userUseCase: IUserService, authenticationService: IAuthenticationService) {
        this._userUseCase = userUseCase;
        this._authenticationService = authenticationService;
    }

    async getUsers(req: Request, res: Response) {
        try {
            const accounts = await this._userUseCase.findAllUsers();
            res.json(
                accounts.map((account: User) => {
                    return {
                        id: account.id,
                        email: account.email,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        role: account.role,
                        status: account.status
                    };
                })
            );
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

    async authenticateUser(req: Request, res: Response) {
        try {
            const {email, password} = req.body;

            const user = await this._userUseCase.findUserByEmail(email);

            if (!user) {
                res.status(400).json({error: 'Email or Password not found'});
                return;
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                res.status(400).json({error: 'Email or Password not found'});
                return;
            }

            const token = await this._authenticationService.createToken(user.id);

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    status: user.status
                },
                token: token
            });
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
