import Account from '../entities/Account';
import IAccountRepository from './IAccountRepository';
import InMemoryRepository from '../../../infrastructure/InMemoryRepository';

class InMemoryAccountRepository extends InMemoryRepository<Account> implements IAccountRepository {
    async create(account: Account): Promise<Account> {
        return super.save(account);
    }

    async update(account: Account): Promise<Account> {
        return super.save(account);
    }

    async delete(account: Account): Promise<Account> {
        await super.deleteById(account.id);
        return account;
    }

    async findById(id: string): Promise<Account | null> {
        return super.findById(id);
    }

    async findByName(name: string): Promise<Account | null> {
        const accounts = await super.findAll();
        return accounts.find(account => account.name === name) || null;
    }

    async findAll(): Promise<Account[]> {
        return super.findAll();
    }

    async createBatch(accounts: Account[]): Promise<Account[]> {
        const savedAccounts: Account[] = [];
        for (const account of accounts) {
            savedAccounts.push(await this.create(account));
        }
        return savedAccounts;
    }
}

export default InMemoryAccountRepository;
