import {Inverter} from '../../../src/inverter/entities/Inverter';
import {InMemoryInverterRepository} from '../../../src/inverter/repositories/InMemoryInverterRepository';
import {IInverterService} from '../../../src/inverter/services/IInverterService';
import {InverterServiceImpl} from '../../../src/inverter/services/InverterServiceImpl';

describe('InverterUseCaseImpl', function () {
    let inverterUseCase: IInverterService;

    beforeEach(function () {
        inverterUseCase = new InverterServiceImpl(new InMemoryInverterRepository());
    });

    it('should create an inverter', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);
    });

    it('should throw if inverter name already in use', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        await expect(inverterUseCase.createInverter(inverter)).rejects.toThrow();
    });

    it('should throw if inverter name is empty', async function () {
        const dataset = {
            name: '',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        await expect(inverterUseCase.createInverter(inverter)).rejects.toThrow();
    });

    it('should update an inverter', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        createdInverter.name = 'Backup Inverter';

        const updatedInverter = await inverterUseCase.updateInverter(createdInverter);

        expect(updatedInverter.name).toBe('Backup Inverter');
    });

    it('should throw if inverter name already in use when updating', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const dataset2 = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial421',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        const inverter2 = await Inverter.create(dataset2);

        await expect(inverterUseCase.updateInverter(inverter2)).rejects.toThrow();
    });

    it('should throw if inverter name is empty when updating', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial421',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        createdInverter.name = '';

        await expect(inverterUseCase.updateInverter(createdInverter)).rejects.toThrow();
    });

    it('should delete an inverter', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        const deletedInverter = await inverterUseCase.deleteInverter(createdInverter);

        expect(deletedInverter).toBeInstanceOf(Inverter);
    });

    it('should find inverter by id', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        const foundInverter = await inverterUseCase.findInverterById(createdInverter.id);

        expect(foundInverter).toBeInstanceOf(Inverter);
    });

    it('should find inverter by name', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        expect(createdInverter).toBeInstanceOf(Inverter);

        const foundInverter = await inverterUseCase.findInverterByName(createdInverter.name);

        expect(foundInverter).toBeInstanceOf(Inverter);
    });

    it('should find all inverters', async function () {
        const dataset = {
            name: 'Home Inverter',
            accountId: '1',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const dataset2 = {
            name: 'Home Inverter 2',
            accountId: '2',
            brand: 'Tesla',
            model: 'Powerwall 3',
            serial: 'unique_serial421',
            maxPower: 7000,
            batteryCapacity: 5200
        };

        const inverter = await Inverter.create(dataset);

        const inverter2 = await Inverter.create(dataset2);

        const createdInverter = await inverterUseCase.createInverter(inverter);

        const createdInverter2 = await inverterUseCase.createInverter(inverter2);

        expect(createdInverter).toBeInstanceOf(Inverter);

        expect(createdInverter2).toBeInstanceOf(Inverter);

        const foundInverters = await inverterUseCase.findAllInverters();

        expect(foundInverters.length).toBe(2);
    });
});
