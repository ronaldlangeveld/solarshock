import Account from '../entities/Account';

interface IAccountRepository {
    create(account: Account): Promise<Account>;
    update(account: Account): Promise<Account>;
    delete(account: Account): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByName(name: string): Promise<Account | null>;
    findAll(): Promise<Account[]>;
    createBatch(accounts: Account[]): Promise<Account[]>;
}

export default IAccountRepository;
