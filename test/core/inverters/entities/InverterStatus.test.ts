import Inverter from '../../../../src/core/inverter/entities/Inverter';
import InverterStatus from '../../../../src/core/inverter/entities/InverterStatus';


describe('InverterStatus Entity', function() {
    it('should create an inverter status entity', async function() {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            createdAt: new Date(),
            currentConsumption: 500,
            currentProduction: 1000
        }

        const inverterStatus = await InverterStatus.create(dataset);
        expect(inverterStatus).toBeInstanceOf(InverterStatus);
    });

    it('should return an inverter status entity as JSON', async function() {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            createdAt: new Date(),
            currentConsumption: 500,
            currentProduction: 1000
        }

        const inverterStatus = await InverterStatus.create(dataset);

        const inverterStatusJson = inverterStatus.toJson(inverterStatus);

        expect(inverterStatusJson).toHaveProperty('id');
        expect(inverterStatusJson).toHaveProperty('createdAt');
        expect(inverterStatusJson).toHaveProperty('inverterId');
        expect(inverterStatusJson).toHaveProperty('batteryLevel');
        expect(inverterStatusJson).toHaveProperty('currentConsumption');
        expect(inverterStatusJson).toHaveProperty('currentProduction');
    });

});
