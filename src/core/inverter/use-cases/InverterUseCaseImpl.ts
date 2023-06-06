import IInverterUseCase from './IInverterUseCase';
import Inverter from '../entities/Inverter';
import IInverterRepository from '../repositories/IinverterRepository';

class InverterUseCaseImpl implements IInverterUseCase {
    private inverterRepository: IInverterRepository;

    constructor(inverterRepository: IInverterRepository) {
        this.inverterRepository = inverterRepository;
    }

    async createInverter(inverter: Inverter): Promise<Inverter> {
        if (inverter.name === '') {
            throw new Error('Inverter name cannot be empty');
        }

        //Check if inverter name already exists

        if (await this.inverterRepository.findByName(inverter.name)) {
            throw new Error('Inverter name already exists');
        }

        return this.inverterRepository.create(inverter);
    }

    async updateInverter(inverter: Inverter): Promise<Inverter> {
        if (inverter.name === '') {
            throw new Error('Inverter name cannot be empty');
        }

        //Check if inverter name already exists if it is different than the current name

        const existingInverter = await this.inverterRepository.findByName(inverter.name);

        if (existingInverter && existingInverter.id !== inverter.id) {
            throw new Error('Inverter name already exists');
        }

        return this.inverterRepository.update(inverter);
    }

    async deleteInverter(inverter: Inverter): Promise<Inverter> {
        return this.inverterRepository.delete(inverter);
    }

    async findInverterById(id: string): Promise<Inverter | null> {
        return this.inverterRepository.findById(id);
    }

    async findInverterByName(name: string): Promise<Inverter | null> {
        return this.inverterRepository.findByName(name);
    }

    async findAllInverters(): Promise<Inverter[]> {
        return this.inverterRepository.findAll();
    }
}

export default InverterUseCaseImpl;
