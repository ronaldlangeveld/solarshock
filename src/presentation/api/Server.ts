import express from 'express';
import IAccountRepository from '../../core/accounts/repositories/IAccountRepository';

interface ServerTypes {
    app: express.Application;
    port: number;
    accountRepository: IAccountRepository;
}

class Server {
    _app: express.Application;
    _port: number;
    _accountRepository: IAccountRepository;

    constructor(props: ServerTypes) {
        this._app = props.app;
        this._port = props.port;
        this._accountRepository = props.accountRepository;
    }

    start() {
        this._app.listen(this._port, () => {
            console.log(`API Server started at http://localhost:${this._port}`); //eslint-disable-line
        });
    }

    getAccountRepository(): IAccountRepository {
        return this._accountRepository;
    }
}

export default Server;
