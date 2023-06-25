import {User, UserRoles, UserStatus} from '../../../src/accounts/entities/User';

describe('User Entity', function () {
    it('should create an User entity', async function () {
        const dataset = {
            email: 'minki@dog.com',
            password: 'test',
            firstName: 'minki',
            lastName: 'langeveld',
            accountId: '1'
        };
        const user = await User.create(dataset);

        expect(user).toBeInstanceOf(User);
    });

    it('should return an User entity as JSON', async function () {
        const dataset = {
            email: 'sashi@dog.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);
        const userJson = user.toJson(user);

        expect(userJson).toHaveProperty('id');
        expect(userJson).toHaveProperty('createdAt');
        expect(userJson).toHaveProperty('updatedAt');
        expect(userJson).toHaveProperty('email');
        expect(userJson).toHaveProperty('firstName');
        expect(userJson).toHaveProperty('lastName');
        expect(userJson).toHaveProperty('role');
    });

    it('should hash the password', async function () {
        const dataset = {
            email: 'sashi@dog.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            role: UserRoles.USER,
            status: UserStatus.ACTIVE,
            accountId: '1'
        };

        const user = await User.create(dataset);
        expect(user.password).not.toBe(dataset.password);
    });

    it('should throw if the password is blank', async function () {
        const dataset = {
            email: 'sashi@dog.com',
            password: '',
            firstName: 'sashi',
            lastName: 'langeveld',
            role: UserRoles.USER,
            status: UserStatus.ACTIVE,
            accountId: '1'
        };

        await expect(User.create(dataset)).rejects.toThrow();
    });

    it('should throw if the email is blank', async function () {
        const dataset = {
            email: '',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        await expect(User.create(dataset)).rejects.toThrow();
    });

    it('should compare the password', async function () {
        const dataset = {
            email: 'sashi.forever.puppy@sausagemail.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);

        expect(await user.comparePassword(dataset.password)).toBe(true);
    });

    it('should return false if password comparison is false', async function () {
        const dataset = {
            email: 'sashi.forever.puppy@sausagemail.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);

        expect(await user.comparePassword('sashithequeen')).toBe(false);
    });

    it('defaults to user role and inactive status', async function () {
        const dataset = {
            email: 'sashi.forever.puppy@sausagemail.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);

        expect(user.role).toBe(UserRoles.USER);
    });

    it('should update user role', async function () {
        const dataset = {
            email: 'sashi.forever.puppy@sausagemail.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);

        await user.updateRole('admin');

        expect(user.role).toBe(UserRoles.ADMIN);
    });

    it('should update user status', async function () {
        const dataset = {
            email: 'sashi.forever.puppy@sausagemail.com',
            password: 'sausagesRuleTheWorld',
            firstName: 'sashi',
            lastName: 'langeveld',
            accountId: '1'
        };

        const user = await User.create(dataset);

        await user.updateStatus('active');

        expect(user.status).toBe(UserStatus.ACTIVE);
    });
});
