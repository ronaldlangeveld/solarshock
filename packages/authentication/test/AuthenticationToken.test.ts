import {AuthenticationToken} from '../src';

describe('Auth token entity', function () {
    it('should create an auth token entity', async function () {
        const account = await AuthenticationToken.create({
            userId: '1'
        });

        expect(account).toBeInstanceOf(AuthenticationToken);
    });

    it('should return an auth token entity as JSON', async function () {
        const account = await AuthenticationToken.create({
            userId: '1'
        });
        const accountJson = account.toJson(account);
        expect(accountJson).toHaveProperty('id');
        expect(accountJson).toHaveProperty('createdAt');
        expect(accountJson).toHaveProperty('token');
        expect(accountJson).toHaveProperty('expiresAt');
        expect(accountJson).toHaveProperty('userId');
        expect(accountJson).toHaveProperty('isExpired');
    });

    it('can check if a token is expired', async function () {
        const account = await AuthenticationToken.create({
            userId: '1'
        });
        const accountJson = account.toJson(account);
        expect(accountJson.isExpired).toBe(false);

        jest.useFakeTimers();

        jest.advanceTimersByTime(365 * 24 * 60 * 60 * 1000 + 60 * 1000); // 1 year + 1 minute

        const accountJson2 = account.toJson(account);
        expect(accountJson2.isExpired).toBe(true);
    });
});