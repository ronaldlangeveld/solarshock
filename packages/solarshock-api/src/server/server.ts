import express from 'express';
import {IUserRepository} from '@solarshock/solarshock-core';

interface ServerTypes {
    app: express.Application;
    port: number;
    userRepository: IUserRepository;
}

export class Server {
    _app: express.Application;
    _port: number;
    _userRepository: IUserRepository;

    constructor(props: ServerTypes) {
        this._app = props.app;
        this._port = props.port;
        this._userRepository = props.userRepository;
    }

    start() {
        this._app.listen(this._port, () => {
            console.log(`API Server started at http://localhost:${this._port}`); //eslint-disable-line
        });
    }

    // getAccountRepository(): IAccountRepository {
    //     return this._userRepository;
    // }

    getUserRepository(): IUserRepository {
        return this._userRepository;
    }
}
