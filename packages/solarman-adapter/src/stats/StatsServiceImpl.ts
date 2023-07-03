import {StatsEntity} from './StatsEntity';
import {IStatsService} from './IStatsService';
import {SolarmanApiClient} from '../utils/ApiClient';
import {AuthEntity} from '../auth/AuthEntity';

export class StatsServiceImpl implements IStatsService {
    private readonly _apiClient: SolarmanApiClient;

    constructor(apiClient: SolarmanApiClient) {
        this._apiClient = apiClient;
    }
    async getStats(inverterId: string, authData:AuthEntity): Promise<StatsEntity> {
        try {
            const statsEntity = await this._apiClient.getInverterAndGridData(authData, inverterId);
            return statsEntity;
        } catch (error) {
            throw new Error(`Error getting stats entity: ${error}`);
        }
    }
}
