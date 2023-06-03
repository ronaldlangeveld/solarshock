import Account from '../entities/Account';

interface IAccountUseCase {
    createAccount(account: Account): Promise<Account>;
    updateAccount(account: Account): Promise<Account>;
    deleteAccount(account: Account): Promise<Account>;
    findAccountById(id: string): Promise<Account | null>;
    findAccountByName(name: string): Promise<Account | null>;
    findAllAccounts(): Promise<Account[]>;
    createBatchAccounts(accounts: Account[]): Promise<Account[]>;
}

export default IAccountUseCase;
