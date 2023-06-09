import InverterStatus from '../../../src/inverter/entities/InverterStatus';
import InverterStatusServiceImpl from '../../../src/inverter/services/InverterStatusServiceImpl';
import IInverterStatusService from '../../../src/inverter/services/IInverterStatusService';
import InMemoryInverterStatusRepository from '../../../src/inverter/repositories/InMemoryInverterStatusRepository';

describe('Inverter Status Use Case', function () {
    let inverterStatusUseCase: IInverterStatusService;

    beforeEach(function () {
        inverterStatusUseCase = new InverterStatusServiceImpl(new InMemoryInverterStatusRepository());
    });

    afterEach(function () {
        jest.useRealTimers();
    });

    it('should create an inverter status', async function () {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const inverterStatus = await InverterStatus.create(dataset);

        const createdInverterStatus = await inverterStatusUseCase.createInverterStatus(inverterStatus);

        expect(createdInverterStatus).toBeInstanceOf(InverterStatus);
    });

    it('should find an inverter status by id', async function () {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const inverterStatus = await InverterStatus.create(dataset);

        const createdInverterStatus = await inverterStatusUseCase.createInverterStatus(inverterStatus);

        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusById(createdInverterStatus.id);

        expect(foundInverterStatus).toBeInstanceOf(InverterStatus);
    });

    it('should find an inverter status by inverter id', async function () {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const inverterStatus = await InverterStatus.create(dataset);

        await inverterStatusUseCase.createInverterStatus(inverterStatus);

        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusByInverterId('1', 1, 'desc');

        expect(foundInverterStatus).toBeInstanceOf(Array);
    });

    it('should find all inverter status', async function () {
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const inverterStatus = await InverterStatus.create(dataset);

        await inverterStatusUseCase.createInverterStatus(inverterStatus);

        const inverterStatuses = await inverterStatusUseCase.findAllInverterStatus();

        expect(inverterStatuses).toBeInstanceOf(Array);
    });

    it('should return null if inverter status not found by id', async function () {
        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusById('1');

        expect(foundInverterStatus).toBeNull();
    });

    it('should return empty array if inverter status not found by inverter id', async function () {
        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusByInverterId('1', 1, 'desc');

        expect(foundInverterStatus).toBeInstanceOf(Array);
        expect(foundInverterStatus).toHaveLength(0);
    });

    it('can sort inverter status in descending order', async function () {
        jest.useFakeTimers();
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const dataset2 = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 300,
            currentProduction: 1100
        };

        const inverterStatus = await InverterStatus.create(dataset);

        jest.advanceTimersByTime(10 * 60 * 1000); // 10 minutes

        const inverterStatus2 = await InverterStatus.create(dataset2);

        await inverterStatusUseCase.createInverterStatus(inverterStatus);

        await inverterStatusUseCase.createInverterStatus(inverterStatus2);

        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusByInverterId('1', 2, 'desc');

        expect(foundInverterStatus).toBeInstanceOf(Array);

        expect(foundInverterStatus).toHaveLength(2);

        expect(foundInverterStatus).toEqual(
            [{
                id: expect.any(String),
                inverterId: '1',
                batteryLevel: 100,
                currentConsumption: 300,
                currentProduction: 1100,
                createdAt: expect.any(Date)
            },
            {
                id: expect.any(String),
                inverterId: '1',
                batteryLevel: 100,
                currentConsumption: 800,
                currentProduction: 1500,
                createdAt: expect.any(Date)
            }]);
    });

    it('can sort inverter status in ascending order', async function () {
        jest.useFakeTimers();
        const dataset = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 800,
            currentProduction: 1500
        };

        const dataset2 = {
            inverterId: '1',
            batteryLevel: 100,
            currentConsumption: 300,
            currentProduction: 1100
        };

        const inverterStatus = await InverterStatus.create(dataset);

        jest.advanceTimersByTime(10 * 60 * 1000); // 10 minutes

        const inverterStatus2 = await InverterStatus.create(dataset2);

        await inverterStatusUseCase.createInverterStatus(inverterStatus);

        await inverterStatusUseCase.createInverterStatus(inverterStatus2);

        const foundInverterStatus = await inverterStatusUseCase.findInverterStatusByInverterId('1', 2, 'asc');

        expect(foundInverterStatus).toBeInstanceOf(Array);

        expect(foundInverterStatus).toHaveLength(2);

        expect(foundInverterStatus).toEqual(
            [{
                id: expect.any(String),
                inverterId: '1',
                batteryLevel: 100,
                currentConsumption: 800,
                currentProduction: 1500,
                createdAt: expect.any(Date)
            },
            {
                id: expect.any(String),
                inverterId: '1',
                batteryLevel: 100,
                currentConsumption: 300,
                currentProduction: 1100,
                createdAt: expect.any(Date)
            }]);
    });
});