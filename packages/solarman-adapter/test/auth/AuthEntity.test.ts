import {AuthEntity} from '../../src/auth/AuthEntity';

const dataset = {
    accessToken: 'the-access-token',
    refreshToken: 'the-refresh-token',
    expiresIn: 5183999
};

const expiredDataset = {
    accessToken: 'the-access-token',
    refreshToken: 'the-refresh-token',
    expiresIn: -5183999
};

describe('AuthEntity', function () {
    let auth : AuthEntity;
    let expiredAuth : AuthEntity;

    beforeEach(async function () {
        auth = await AuthEntity.create(dataset);

        expiredAuth = await AuthEntity.create(expiredDataset);
    });

    it('can check if it is expired (false)', function () {
        expect(auth.isExpired()).toBeFalsy();
    });

    it('can check if it is expired (true)', async function () {
        expect(expiredAuth.isExpired()).toBeTruthy();
    });

    it('can return a JSON representation', function () {
        const json = auth.toJson(auth);
        expect(json).toBeDefined();
    });
});
