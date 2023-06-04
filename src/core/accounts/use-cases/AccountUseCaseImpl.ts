import Account from '../entities/Account';
import IAccountUseCase from './IAccountUseCase';
import IAccountRepository from '../repositories/IAccountRepository';

class AccountUseCaseImpl implements IAccountUseCase {
    private accountRepository: IAccountRepository;

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository;
    }

    async createAccount(account: Account): Promise<Account> {
        if (account.name === '') {
            throw new Error('Account name cannot be empty');
        }

        //Check if account name already exists

        if (await this.accountRepository.findByName(account.name)) {
            throw new Error('Account name already exists');
        }

        return this.accountRepository.create(account);
    }

    async updateAccount(account: Account): Promise<Account> {
        return this.accountRepository.update(account);
    }

    async deleteAccount(account: Account): Promise<Account> {
        return this.accountRepository.delete(account);
    }

    async findAccountById(id: string): Promise<Account | null> {
        return this.accountRepository.findById(id);
    }

    async findAccountByName(name: string): Promise<Account | null> {
        return this.accountRepository.findByName(name);
    }

    async findAllAccounts(): Promise<Account[]> {
        return this.accountRepository.findAll();
    }

    async createBatchAccounts(accounts: Account[]): Promise<Account[]> {
        // return this.accountRepository.createBatch(accounts);

        // for each one we are adding we need to make sure it doesn't already exist

        const accountsToSave: Account[] = [];

        for (const account of accounts) {
            if (await this.accountRepository.findByName(account.name)) {
                throw new Error('Account name already exists');
            }

            if (account.name === '') {
                throw new Error('Account name cannot be empty');
            }
            accountsToSave.push(account);
        }

        return this.accountRepository.createBatch(accountsToSave);
    }
}

export default AccountUseCaseImpl;
