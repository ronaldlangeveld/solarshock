import IUserRepository from './IUserRepository';
import User from '../entities/User';

import InMemoryRepository from '../../../infrastructure/data/Memory/InMemoryRepository';

class InMemoryUserRepository extends InMemoryRepository<User> implements IUserRepository {
    async create(user: User): Promise<User> {
        return super.save(user);
    }

    async update(user: User): Promise<User> {
        return super.save(user);
    }

    async delete(user: User): Promise<User> {
        await super.deleteById(user.id);
        return user;
    }

    async findById(id: string): Promise<User | null> {
        return super.findById(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        const users = await super.findAll();
        return users.find(user => user.email === email) || null;
    }

    async findAll(): Promise<User[]> {
        return super.findAll();
    }

    async createBatch(users: User[]): Promise<User[]> {
        const savedUsers: User[] = [];
        for (const user of users) {
            savedUsers.push(await this.create(user));
        }
        return savedUsers;
    }
}

export default InMemoryUserRepository;
