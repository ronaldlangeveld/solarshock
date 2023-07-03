import {IAuthService} from './IAuthService';
import {InMemoryAuthServiceRepository} from './InMemoryAuthServiceRepository';
import {AuthEntity} from './AuthEntity';
import {SolarmanApiClient} from '../utils/ApiClient';

export class AuthServiceImpl implements IAuthService {
    private readonly _authServiceRepository: InMemoryAuthServiceRepository;
    private readonly _apiClient: SolarmanApiClient;

    constructor(
        authServiceRepository: InMemoryAuthServiceRepository,
        apiClient: SolarmanApiClient
    ) {
        this._authServiceRepository = authServiceRepository;
        this._apiClient = apiClient;
    }

    async create(): Promise<AuthEntity> {
        try {
            const authEntity = await this._apiClient.authenticate();
            return this._authServiceRepository.create(authEntity);
        } catch (error) {
            throw new Error(`Error creating auth entity: ${error}`);
        }
    }

    async getLatestAuth(): Promise<AuthEntity> {
        try {
            const latest = await this._authServiceRepository.getLatestAuth();
            return latest;
        } catch (error) {
            return await this.create();
        }
    }
}
