import {InMemoryRepository} from '@solarshock/in-memory-repository';
import {IInverterRepository} from './IinverterRepository';
import {Inverter} from '../entities/Inverter';

export class InMemoryInverterRepository extends InMemoryRepository<Inverter> implements IInverterRepository {
    async create(inverter: Inverter): Promise<Inverter> {
        return super.save(inverter);
    }

    async update(inverter: Inverter): Promise<Inverter> {
        return super.save(inverter);
    }

    async delete(inverter: Inverter): Promise<Inverter> {
        await super.deleteById(inverter.id);
        return inverter;
    }

    async findById(id: string): Promise<Inverter | null> {
        return super.findById(id);
    }

    async findByName(name: string): Promise<Inverter | null> {
        const inverters = await super.findAll();
        return inverters.find(inverter => inverter.name === name) || null;
    }
    
    async findAll(): Promise<Inverter[]> {
        return super.findAll();
    }
}
