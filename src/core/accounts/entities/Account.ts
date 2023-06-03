import crypto from 'crypto';

type AccountEntityTypes = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

type AccountRequestModel = {
    name: string;
}

class Account {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;

    constructor(data: AccountEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.name = data.name;
    }

    toJson(account: Account): AccountEntityTypes {
        return {
            id: account.id,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
            name: account.name,
        };
    }

    static async create(data: AccountRequestModel): Promise<Account> {
        const dataset = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: data.name,
        };
        return new Account(dataset);
    }
}

export default Account;
