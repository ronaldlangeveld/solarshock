import {StatsEntity} from './StatsEntity';
import {AuthEntity} from '../auth/AuthEntity';

export interface IStatsService {
    getStats(inverterId:string, authData: AuthEntity): Promise<StatsEntity>;
}