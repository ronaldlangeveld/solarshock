import {IStatsService} from './IStatsService';
import {SolarmanApiClient} from '../utils/ApiClient';
import {StatsEntity} from '@solarshock/solarshock-core';
import {AuthServiceImpl} from '../auth/AuthServiceImpl';

export class StatsServiceImpl implements IStatsService {
    private readonly _authService: AuthServiceImpl;
    private readonly _apiClient: SolarmanApiClient;

    constructor(apiClient: SolarmanApiClient, authService: AuthServiceImpl) {
        this._apiClient = apiClient;
        this._authService = authService;
    }
    async getStats(inverterId: string): Promise<StatsEntity> {
        try {
            const authData = await this._authService.getLatestAuth();
            const statsEntity = await this._apiClient.getInverterAndGridData(authData, inverterId);
            return statsEntity;
        } catch (error) {
            throw new Error(`Error getting stats entity: ${error}`);
        }
    }
}
