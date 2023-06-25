import express from 'express';
import {IUserRepository} from '@solarshock/solarshock-core';
import {IAuthenticationRepository} from '@solarshock/authentication';

interface ServerTypes {
    app: express.Application;
    port: number;
    userRepository: IUserRepository;
    authenticationRepository: IAuthenticationRepository;
}

export class Server {
    _app: express.Application;
    _port: number;
    _userRepository: IUserRepository;
    _authenticationRepository: IAuthenticationRepository;

    constructor(props: ServerTypes) {
        this._app = props.app;
        this._port = props.port;
        this._userRepository = props.userRepository;
        this._authenticationRepository = props.authenticationRepository;
    }

    start() {
        this._app.listen(this._port, () => {
            console.log(`API Server started at http://localhost:${this._port}`); //eslint-disable-line
        });
    }
    
    getUserRepository(): IUserRepository {
        return this._userRepository;
    }

    getAuthenticationRepository(): IAuthenticationRepository {
        return this._authenticationRepository;
    }
}
