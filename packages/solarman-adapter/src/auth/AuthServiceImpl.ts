import {IAuthService} from './IAuthService';
import {InMemoryAuthServiceRepository} from './InMemoryAuthServiceRepository';
import {AuthEntity} from './AuthEntity';
import {SolarmanApiClient} from '../utils/ApiClient';

export class AuthServiceImpl implements IAuthService {
    private readonly _authServiceRepository: InMemoryAuthServiceRepository;
    private readonly _solarmanAppSecret: string;
    private readonly _solarmanAppId: string;
    private readonly _solarmanEmail: string;
    private readonly _solarmanPassword: string;
    private readonly _solarmanBaseUrl: string;

    constructor(
        authServiceRepository: InMemoryAuthServiceRepository,
        solarmanAppSecret: string,
        solarmanAppId: string,
        solarmanEmail: string,
        solarmanPassword: string,
        solarmanBaseUrl: string
    ) {
        this._authServiceRepository = authServiceRepository;
        this._solarmanAppSecret = solarmanAppSecret;
        this._solarmanAppId = solarmanAppId;
        this._solarmanEmail = solarmanEmail;
        this._solarmanPassword = solarmanPassword;
        this._solarmanBaseUrl = solarmanBaseUrl;
    }

    async create(): Promise<AuthEntity> {
        try {
            const solarmanApiClient = new SolarmanApiClient(
                this._solarmanAppSecret,
                this._solarmanAppId,
                this._solarmanEmail,
                this._solarmanPassword,
                this._solarmanBaseUrl
            );
    
            const authEntity = await solarmanApiClient.authenticate();
            return this._authServiceRepository.create(authEntity);
        } catch (error) {
            throw new Error(`Error creating auth entity: ${error}`);
        }
    }

    async getLatestAuth(): Promise<AuthEntity> {
        try {
            const latest = await this._authServiceRepository.getLatestAuth();
            if (!latest) {
                return this.create();
            }
            if (latest.isExpired()) {
                return this.create();
            }
            return latest;
        } catch (error) {
            throw new Error(`Error getting latest auth entity: ${error}`);
        }
    }
}
