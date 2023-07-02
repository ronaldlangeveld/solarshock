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

    it('should create an auth entity', function () {
        expect(auth).toBeDefined();
    });

    it('should have an access token', function () {
        expect(auth.accessToken).toBeDefined();
    });

    it('should have a refresh token', function () {
        expect(auth.refreshToken).toBeDefined();
    });

    it('should have an expires in', function () {
        expect(auth.expiresIn).toBeDefined();
    });

    it('can check if it is expired (false)', function () {
        expect(auth.isExpired()).toBeFalsy();
    });

    it('can check if it is expired (true)', async function () {
        expect(expiredAuth.isExpired()).toBeTruthy();
    });
});