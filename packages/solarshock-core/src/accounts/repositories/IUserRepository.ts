import User from '../entities/User';

interface IUserRepository {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(user: User): Promise<User>;
    findById(id: string): Promise<User|null>;
    findByEmail(email: string): Promise<User|null>;
    findAll(): Promise<User[]> | [];
    createBatch(users: User[]): Promise<User[]>;
}

export default IUserRepository;
