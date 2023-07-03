import {
    AuthServiceImpl, 
    InMemoryAuthServiceRepository,
    AuthEntity,
    SolarmanApiClient
} from '../../src';

jest.mock('../../src/utils/ApiClient');

describe('Solarman Adapter Auth Service', function () {
    let mockApiClient: SolarmanApiClient;
    let authService: AuthServiceImpl;
    let authServiceRepository: InMemoryAuthServiceRepository;
    const MockSolarmanApiClient = SolarmanApiClient as jest.MockedClass<typeof SolarmanApiClient>;
  
    beforeEach(function () {
        authServiceRepository = new InMemoryAuthServiceRepository();

        mockApiClient = new MockSolarmanApiClient(
            'mock-app-secret',
            'mock-app-id',
            'mock-email',
            'mock-password',
            'mock-base-url'
        );

        authService = new AuthServiceImpl(
            authServiceRepository,
            mockApiClient
        );

        mockApiClient.authenticate = jest.fn().mockResolvedValue(
            AuthEntity.create({
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                expiresIn: 3600
            })
        );
      
        authService = new AuthServiceImpl(authServiceRepository, mockApiClient);
    });
  
    afterEach(function () {
        jest.resetAllMocks();
    });
  
    test('should create a new auth entity', async function () {
        const result = await authService.create();
        expect(mockApiClient.authenticate).toHaveBeenCalled();
        expect(result).toBeInstanceOf(AuthEntity);
    });

    test('should get the latest auth entity', async function () {
        await authService.create();
        const result = await authService.getLatestAuth();
        expect(mockApiClient.authenticate).toHaveBeenCalled();
        expect(result).toBeInstanceOf(AuthEntity);
    });

    test('should throw if error fetching new token', async function () {
        mockApiClient.authenticate = jest.fn().mockRejectedValue('Bad Request');
        await expect(authService.create()).rejects.toThrowError('Error creating auth entity: Bad Request');
    });

    test('creates a new auth entity if none exists', async function () {
        const result = await authService.getLatestAuth();
        expect(mockApiClient.authenticate).toHaveBeenCalled();
        expect(result).toBeInstanceOf(AuthEntity);
    });

    test('should throw if error fetching latest auth entity', async function () {
        mockApiClient.authenticate = jest.fn().mockRejectedValue('Bad Request');
        await expect(authService.getLatestAuth()).rejects.toThrowError('Error creating auth entity: Bad Request');
    });
});
