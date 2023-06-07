import User, {UserRoles, UserStatus} from '../../../../src/core/accounts/entities/User';
import UserUseCaseImpl from '../../../../src/core/accounts/use-cases/UserUseCaseImpl';
import IUserUseCase from '../../../../src/core/accounts/use-cases/IUserUseCase';
import InMemoryUserRepository from '../../../../src/core/accounts/repositories/InMemoryUserRepository';

describe('User Use Case', function () {
    let userUseCase: IUserUseCase;

    beforeEach(function () {
        userUseCase = new UserUseCaseImpl(new InMemoryUserRepository());
    });

    describe('Create User', function () {
        it('should create a user', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const createdUser = await userUseCase.createUser(user);

            expect(createdUser).toBeInstanceOf(User);

            expect(createdUser?.email).toEqual('dobby@hogwarts.co.uk');
            expect(createdUser?.firstName).toEqual('Dobby');
            expect(createdUser?.lastName).toEqual('The House Elf');
        });

        it('should throw an error if user email already exists', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            await userUseCase.createUser(user);

            await expect(userUseCase.createUser(user)).rejects.toThrowError();
        });

        it('should update user properties', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const createdUser = await userUseCase.createUser(user);

            createdUser.firstName = 'Dumbledore';

            const updatedUser = await userUseCase.updateUser(createdUser);

            expect(updatedUser).toBeInstanceOf(User);

            expect(updatedUser?.firstName).toEqual('Dumbledore');

            createdUser.lastName = 'The Wizard';

            const updatedUser2 = await userUseCase.updateUser(createdUser);

            expect(updatedUser2).toBeInstanceOf(User);

            expect(updatedUser2?.lastName).toEqual('The Wizard');

            createdUser.email = 'dumbledore@hogwarts.co.uk';

            const updatedUser3 = await userUseCase.updateUser(createdUser);

            expect(updatedUser3).toBeInstanceOf(User);

            expect(updatedUser3?.email).toEqual('dumbledore@hogwarts.co.uk');

            const newPassword = 'password';

            createdUser.password = await createdUser.updatePassword(newPassword);

            const updatedUser4 = await userUseCase.updateUser(createdUser);

            expect(updatedUser4).toBeInstanceOf(User);
            // ensure that the password is not the same because it should be hashed
            expect(updatedUser4?.password).not.toEqual(newPassword);
            // check that password starts with $2b$10$ which is the bcrypt hash
            expect(updatedUser4?.password).toMatch(/^\$2b\$10\$/);
        });

        it('should find a user by id', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const createdUser = await userUseCase.createUser(user);

            const foundUser = await userUseCase.findUserById(createdUser.id);

            expect(foundUser).toBeInstanceOf(User);

            expect(foundUser?.id).toEqual(createdUser.id);
        });

        it('should return null if user with id does not exist', async function () {
            const foundUser = await userUseCase.findUserById('1');
            expect(foundUser).toBeNull();
        });

        it('should return null if user with email does not exist', async function () {
            const foundUser = await userUseCase.findUserByEmail('ron@hogwarts.co.uk');
            expect(foundUser).toBeNull();
        });

        it('should find a user by email', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const createdUser = await userUseCase.createUser(user);

            const foundUser = await userUseCase.findUserByEmail(createdUser.email);

            expect(foundUser).toBeInstanceOf(User);

            expect(foundUser?.email).toEqual(createdUser.email);
        });

        it('should create batch users', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const user2 = await User.create({
                email: 'hagrid@hogwarts.co.uk',
                password: 'dragonsarecool',
                firstName: 'Rubeus',
                lastName: 'Hagrid',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const users = [user, user2];

            const createdUsers = await userUseCase.createBatchUsers(users);

            expect(createdUsers).toBeInstanceOf(Array);

            expect(createdUsers.length).toEqual(2);
        });

        it('should error if email exists in saving batch', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const user2 = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const users = [user, user2];

            await expect(userUseCase.createBatchUsers(users)).rejects.toThrowError();
        });

        it('should error if another user email exists when updating user email', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const user2 = await User.create({
                email: 'harry@hogwarts.co.uk',
                password: 'iloveMybroomstickGoGryffindor',
                firstName: 'Harry',
                lastName: 'Potter',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const dobbyAccount = await userUseCase.createUser(user);
            await userUseCase.createUser(user2);

            // dobbyAccount.email = 'harry@hogwarts.co.uk';

            const dobbyInstance = new User(dobbyAccount);
            dobbyInstance.email = 'harry@hogwarts.co.uk';
            await expect(userUseCase.updateUser(dobbyInstance)).rejects.toThrowError('User email already exists');
        });

        it('should find all users', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const user2 = await User.create({
                email: 'hagrid@hogwarts.co.uk',
                password: 'dragonsarecool',
                firstName: 'Rubeus',
                lastName: 'Hagrid',
                role: UserRoles.ADMIN,
                status: UserStatus.ACTIVE
            });

            const users = [user, user2];

            await userUseCase.createBatchUsers(users);

            const foundUsers = await userUseCase.findAllUsers();

            expect(foundUsers).toBeInstanceOf(Array);
            expect(foundUsers.length).toEqual(2);
        });

        it('should delete a user', async function () {
            const user = await User.create({
                email: 'dobby@hogwarts.co.uk',
                password: 'socksislife1992',
                firstName: 'Dobby',
                lastName: 'The House Elf',
                role: UserRoles.USER,
                status: UserStatus.ACTIVE
            });

            const user2 = await User.create({
                email: 'hagrid@hogwarts.co.uk',
                password: 'dragonsarecool',
                firstName: 'Rubeus',
                lastName: 'Hagrid',
                role: UserRoles.ADMIN,
                status: UserStatus.ACTIVE
            });

            const users = [user, user2];

            await userUseCase.createBatchUsers(users);

            // delete the first user

            await userUseCase.deleteUser(user);

            const foundUsers = await userUseCase.findAllUsers();

            expect(foundUsers).toBeInstanceOf(Array);

            expect(foundUsers.length).toEqual(1);
        });
    });
});
