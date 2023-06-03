import Account from '../../../../src/core/accounts/entities/Account';

describe('Account Entity', function () {
    it('should create an account entity', async function () {
        const account = await Account.create({
            name: 'Test Account',
        });

        expect(account).toBeInstanceOf(Account);
    });

    it('should return an account entity as JSON', async function () {
        const account = await Account.create({
            name: 'Test Account',
        });
        const accountJson = account.toJson(account);
        expect(accountJson).toHaveProperty('id');
        expect(accountJson).toHaveProperty('createdAt');
        expect(accountJson).toHaveProperty('updatedAt');
    });
});
