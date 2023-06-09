import {IUserRepository} from '../repositories/IUserRepository';
import {User, UserRoles, UserStatus} from '../entities/User';
import {IUserService} from './IUserService';

export class UserServiceImpl implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(user: User): Promise<User> {
        //Check if user email already exists
        if (await this.userRepository.findByEmail(user.email)) {
            throw new Error('User email already exists');
        }

        // if this is the first user, make them an admin else default to user
        if ((await this.userRepository.findAll()).length === 0) {
            user.role = UserRoles.ADMIN;
        } else {
            user.role = UserRoles.USER;
        }

        // by default we are going to make the user inactive
        // they will need to verify their email address

        user.status = UserStatus.INACTIVE;

        return this.userRepository.create(user);
    }

    async updateUser(user: User): Promise<User> {
        const existingUser = await this.findUserByEmail(user.email);
        if (existingUser && existingUser.id !== user.id) {
            throw Error('User email already exists');
        }
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
            usersToSave.push(await this.createUser(user));
        }

        return this.userRepository.createBatch(usersToSave);
    }
}
