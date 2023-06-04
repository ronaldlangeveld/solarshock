import User from '../entities/User';

interface IUserUseCase {
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(user: User): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findAllUsers(): Promise<User[]>;
    createBatchUsers(users: User[]): Promise<User[]>;
}

export default IUserUseCase;
