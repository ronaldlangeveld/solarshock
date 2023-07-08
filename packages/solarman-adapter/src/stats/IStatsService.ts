import {StatsEntity} from '@solarshock/solarshock-core';
export interface IStatsService {
    getStats(inverterId:string): Promise<StatsEntity>;
}
