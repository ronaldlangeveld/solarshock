import {IDataSource} from '../IDataSource';
import {StatsEntity} from '@solarshock/solarshock-core';
import {StatsServiceImpl} from '@solarshock/solarman-adapter';

export class SolarmanService implements IDataSource<StatsEntity> {
    private readonly solarmanAdapter: StatsServiceImpl;

    constructor(solarmanAdapter: StatsServiceImpl) {
        this.solarmanAdapter = solarmanAdapter;
    }

    async fetchData(inverterId: string): Promise<StatsEntity> { 
        const rawData = await this.solarmanAdapter.getStats(inverterId);
        return rawData;
    }
}
