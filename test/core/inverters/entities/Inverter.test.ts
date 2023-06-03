import Inverter from '../../../../src/core/inverter/entities/Inverter';

describe('Inverter Entity', function() {
    it('should create an inverter entity', async function() {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200,
        }

        const inverter = await Inverter.create(dataset);
        expect(inverter).toBeInstanceOf(Inverter);
    });

    it('should return an inverter entity as JSON', async function() {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200,
        }

        const inverter = await Inverter.create(dataset);

        const inverterJson = inverter.toJson(inverter);

        expect(inverterJson).toHaveProperty('id');
        expect(inverterJson).toHaveProperty('createdAt');
        expect(inverterJson).toHaveProperty('updatedAt');
        expect(inverterJson).toHaveProperty('name');
        expect(inverterJson).toHaveProperty('accountId');
        expect(inverterJson).toHaveProperty('brand');
        expect(inverterJson).toHaveProperty('model');
        expect(inverterJson).toHaveProperty('serial');
        expect(inverterJson).toHaveProperty('maxPower');
        expect(inverterJson).toHaveProperty('batteryCapacity');
    });

})