import IUserRepository from '../repositories/IUserRepository';
import User from '../entities/User';
import IUserUseCase from './IUserUseCase';

class UserUseCaseImpl implements IUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(user: User): Promise<User> {
        if (user.email === '') {
            throw new Error('User email cannot be empty');
        }

        //Check if user email already exists
        if (await this.userRepository.findByEmail(user.email)) {
            throw new Error('User email already exists');
        }

        return this.userRepository.create(user);
    }

    async updateUser(user: User): Promise<User> {
        return this.userRepository.update(user);
    }

    async deleteUser(user: User): Promise<User> {
        return this.userRepository.delete(user);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async createBatchUsers(users: User[]): Promise<User[]> {
        // return this.userRepository.createBatch(users);

        // for each one we are adding we need to make sure it doesn't already exist

        const usersToSave: User[] = [];

        for (const user of users) {
            if (await this.userRepository.findByEmail(user.email)) {
                throw new Error('User email already exists');
            }

            if (user.email === '') {
                throw new Error('User email cannot be empty');
            }

            usersToSave.push(await this.createUser(user));
        }

        return this.userRepository.createBatch(usersToSave);
    }
}

export default UserUseCaseImpl;
