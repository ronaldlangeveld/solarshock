import {StatsEntity} from '../../src';

describe('StatsEntity', function () {
    let currentStats : StatsEntity;
    const dataset = {
        currentProduction: 100,
        currentConsumption: 50,
        batteryLevel: 50,
        gridFrequency: 50,
        inverterId: '123'
    };

    it('can create a new stats entity', async function () {
        currentStats = await StatsEntity.create(dataset);
        expect(currentStats).toBeInstanceOf(StatsEntity);
    });
    it('can return a JSON representation', function () {
        const json = currentStats.toJson(currentStats);
        expect(json).toBeDefined();
    });
});
