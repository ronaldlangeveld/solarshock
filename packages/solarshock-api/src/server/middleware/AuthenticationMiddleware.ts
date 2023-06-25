import {Request, Response, NextFunction} from 'express';
import {IAuthenticationService} from '@solarshock/authentication';
import {IUserService, User} from '@solarshock/solarshock-core';

export class AuthenticationMiddleware {
    private _authenticationService: IAuthenticationService;
    private _userService: IUserService;
    private _userEntity: User | null;

    constructor(authenticationService: IAuthenticationService, userService: IUserService) {
        this._authenticationService = authenticationService;
        this._userService = userService;
        this._userEntity = null;
    }

    async isAuthenticated(token: string): Promise<boolean> {
        try {
            const authenticationToken = await this._authenticationService.validateToken(token);
            if (!authenticationToken) {
                return false;
            }

            const user = await this._userService.findUserById(authenticationToken.userId);
            if (!user) {
                return false;
            }
            this._userEntity = user;
            return true;
        } catch (error) {
            return false;
        }
    }

    async authenticate(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }

        const isAuthenticated = await this.isAuthenticated(token);

        if (!isAuthenticated) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }

        if (!this._userEntity) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }

        if (this._userEntity.status === 'banned') {
            res.status(401).json({error: 'Your account has been banned'});
            return;
        }

        if (this._userEntity.status === 'inactive') {
            res.status(401).json({error: 'Your account is not active'});
            return;
        }
        next();
    }

    async userIsAdmin(req: Request, res: Response, next: NextFunction) {
        if (!this._userEntity) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }

        if (this._userEntity.role !== 'admin') {
            res.status(401).json({error: 'You are not authorized to perform this action'});
            return;
        }
        next();
    }
}
