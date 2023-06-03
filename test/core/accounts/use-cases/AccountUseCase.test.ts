import Account from '../../../../src/core/accounts/entities/Account';
import AccountUseCaseImpl from '../../../../src/core/accounts/use-cases/AccountUseCaseImpl';
import IAccountUseCase from '../../../../src/core/accounts/use-cases/IAccountUseCase';
import InMemoryAccountRepository from '../../../../src/core/accounts/repositories/InMemoryAccountRepository';

describe('Account Use Case', function () {
    let accountUseCase: IAccountUseCase;

    beforeEach(function () {
        accountUseCase = new AccountUseCaseImpl(new InMemoryAccountRepository());
    });

    describe('Accounts', function () {
        it('should create an account', async function () {
            const account = await Account.create({
                name: 'Test Account',
            });
            const createdAccount = await accountUseCase.createAccount(account);
            expect(createdAccount).toBeInstanceOf(Account);
        });

        it('should find an account by name', async function () {
            const account = await Account.create({
                name: 'Test Account',
            });
            const createdAccount = await accountUseCase.createAccount(account);

            const foundAccount = await accountUseCase.findAccountByName('Test Account');
            expect(foundAccount).toBeInstanceOf(Account);
            expect(foundAccount?.name).toEqual('Test Account');
            expect(foundAccount?.id).toEqual(createdAccount.id);
        });

        it('should throw an error if account name already exists', async function () {
            const account = await Account.create({
                name: 'Test Account',
            });

            await accountUseCase.createAccount(account);
            await expect(accountUseCase.createAccount(account)).rejects.toThrowError();
        });

        it('should throw an error if account name is empty', async function () {
            const account = await Account.create({
                name: '',
            });
            await expect(accountUseCase.createAccount(account)).rejects.toThrowError();
        });

        it('can update an account', async function () {
            const account = await Account.create({
                name: 'Tester',
            });
            const createdAccount = await accountUseCase.createAccount(account);
            createdAccount.name = 'Tester 2';
            let accountId = createdAccount.id;

            const updatedAccount = await accountUseCase.updateAccount(createdAccount);
            expect(updatedAccount).toBeInstanceOf(Account);
            expect(updatedAccount.id).toEqual(accountId);
            expect(updatedAccount.name).toEqual('Tester 2');

        });

        it('can find an account by id', async function () {
            const account = await Account.create({
                name: 'Tester', // here we can use the same name because the id is different
            });
            const createdAccount = await accountUseCase.createAccount(account);
            const foundAccount = await accountUseCase.findAccountById(createdAccount.id);
            expect(foundAccount).toBeInstanceOf(Account);
            expect(foundAccount?.id).toEqual(createdAccount.id);
        });

        it('will return null if account is not found by id', async function () {
            const account = await Account.create({
                name: 'Tester',
            });

            const createdAccount = await accountUseCase.createAccount(account);
            const foundAccount = await accountUseCase.findAccountById('123');
            expect(foundAccount).toBeNull();
        });

        it('can delete an account by id', async function () {
            const account = await Account.create({
                name: 'Tester',
            });
            const createdAccount = await accountUseCase.createAccount(account);
            const deletedAccount = await accountUseCase.deleteAccount(createdAccount);
            expect(deletedAccount).toBeInstanceOf(Account);
            expect(deletedAccount.id).toEqual(createdAccount.id);
        });

        it('can create a batch of accounts', async function () {
            const account1 = await Account.create({
                name: 'Tester 1',
            });

            const account2 = await Account.create({
                name: 'Tester 2',
            });

            const account3 = await Account.create({
                name: 'Tester 3',
            });

            const accounts = await accountUseCase.createBatchAccounts([account1, account2, account3]);

            expect(accounts).toBeInstanceOf(Array);

            expect(accounts.length).toEqual(3);
        });

        it('can find all accounts', async function () {
            const account1 = await Account.create({
                name: 'Tester 1',
            });

            const account2 = await Account.create({
                name: 'Tester 2',
            });

            const account3 = await Account.create({
                name: 'Tester 3',
            });

            await accountUseCase.createBatchAccounts([account1, account2, account3]);

            const accounts = await accountUseCase.findAllAccounts();

            expect(accounts).toBeInstanceOf(Array);

            expect(accounts.length).toEqual(3);
        });

        it('should throw an error if name in batch is empty', async function () {
            const account1 = await Account.create({
                name: 'Tester 1',
            });

            const account2 = await Account.create({
                name: '',
            });

            const account3 = await Account.create({
                name: 'Tester 3',
            });

            await expect(accountUseCase.createBatchAccounts([account1, account2, account3])).rejects.toThrowError();
        });

        it('should throw an error if name in batch already exists', async function () {
            const account1 = await Account.create({
                name: 'Tester 1',
            });

            const account2 = await Account.create({
                name: 'Tester 1',
            });

            const account3 = await Account.create({
                name: 'Tester 3',
            });

            await accountUseCase.createBatchAccounts([account1, account2, account3]);

            await expect(accountUseCase.createBatchAccounts([account1, account2, account3])).rejects.toThrowError();
        });
    });
});
