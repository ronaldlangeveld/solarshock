import {
    AuthServiceImpl, 
    InMemoryAuthServiceRepository,
    AuthEntity,
    SolarmanApiClient,
    StatsEntity,
    IStatsService,
    StatsServiceImpl
} from '../../src';

jest.mock('../../src/utils/ApiClient');

describe('Solarman Adapter Stats Service', function () {
    let mockApiClient: SolarmanApiClient;
    let authService: AuthServiceImpl;
    let statsService: IStatsService;
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

        mockApiClient.getInverterAndGridData = jest.fn().mockResolvedValue(
            StatsEntity.create({
                currentProduction: 100,
                currentConsumption: 50,
                batteryLevel: 50,
                gridFrequency: 50,
                inverterId: '123'
            })
        );
      
        authService = new AuthServiceImpl(authServiceRepository, mockApiClient);
        statsService = new StatsServiceImpl(mockApiClient);
    });
  
    afterEach(function () {
        jest.resetAllMocks();
    });
  
    test('should create a new stats entity', async function () {
        const authData = await authService.create();
        const result = await statsService.getStats('123', authData);

        expect(mockApiClient.authenticate).toHaveBeenCalled();
        expect(mockApiClient.getInverterAndGridData).toHaveBeenCalled();
        expect(result).toBeInstanceOf(StatsEntity);
    });

    test('should throw if error fetching new stats', async function () {
        const authData = await authService.create();
        mockApiClient.getInverterAndGridData = jest.fn().mockRejectedValue(new Error('mock-error'));
        await expect(statsService.getStats('123', authData)).rejects.toThrow('Error getting stats entity: Error: mock-error');
    });
});
