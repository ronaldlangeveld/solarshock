import AuthenticationToken from '../../../src/infrastructure/authentication/AuthenticationToken';
import IAuthenticationService from '../../../src/infrastructure/authentication/IAuthenticationService';
import AuthenticationService from '../../../src/infrastructure/authentication/AuthenticationService';
import InMemoryAuthenticationRepository from '../../../src/infrastructure/authentication/InMemoryAuthenticationRepository';
import IAuthenticationRepository from '../../../src/infrastructure/authentication/IAuthenticationRepository';

describe('Authentication service', function () {
    let authenticationService: IAuthenticationService;
    let authenticationRepository: IAuthenticationRepository;

    beforeEach(function () {
        authenticationRepository = new InMemoryAuthenticationRepository();
        authenticationService = new AuthenticationService(authenticationRepository);
    });

    afterEach(function () {
        jest.useRealTimers();
    });

    it('should create an auth token', async function () {
        const token = await authenticationService.createToken('1');
        expect(token).toBeInstanceOf(AuthenticationToken);
    });

    it('should validate a token', async function () {
        const token = await authenticationService.createToken('1');
        const validatedToken = await authenticationService.validateToken(token.token);
        expect(validatedToken).toBeInstanceOf(AuthenticationToken);
    });

    it('should throw if token does not exist', async function () {
        await authenticationService.createToken('1');
        expect(authenticationService.validateToken('2')).rejects.toThrow('Token not found');
    });

    it('should throw if token is expired', async function () {
        const token = await authenticationService.createToken('1');
        jest.useFakeTimers();
        jest.advanceTimersByTime(365 * 24 * 60 * 60 * 1000 + 60 * 1000); // 1 year + 1 minute

        expect(authenticationService.validateToken(token.token)).rejects.toThrow('Token expired');
    });

    it('should get tokens by user id', async function () {
        const token = await authenticationService.createToken('1');
        const tokens = await authenticationService.getTokensByUserId('1');
        expect(tokens).toEqual([token]);
    });

    it('should null if token does not exist', async function () {
        await authenticationService.createToken('1');
        const tokens = await authenticationService.getTokensByUserId('2');
        expect(tokens).toBeNull();
    });

    it('should find all tokens', async function () {
        const token1 = await authenticationService.createToken('1');
        const token2 = await authenticationService.createToken('2');
        const tokens = await authenticationService.findAll();
        expect(tokens).toEqual([token1, token2]);
    });

    it('should return empty array if no tokens exist', async function () {
        const tokens = await authenticationService.findAll();
        expect(tokens).toEqual([]);
    });

    it('should return null if no tokens found for user ID', async function () {
        const userId = '1';
        const tokens: AuthenticationToken[] = [];
        jest
            .spyOn(authenticationRepository, 'findByUserId')
            .mockResolvedValue(tokens);
      
        const result = await authenticationService.getTokensByUserId(userId);
      
        expect(result).toBeNull();
    });
});
