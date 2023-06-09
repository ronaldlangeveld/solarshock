import {Inverter} from '../entities/Inverter';

export interface IInverterRepository {
    create(inverter: Inverter): Promise<Inverter>;
    update(inverter: Inverter): Promise<Inverter>;
    delete(inverter: Inverter): Promise<Inverter>;
    findById(id: string): Promise<Inverter | null>;
    findByName(name: string): Promise<Inverter | null>;
    findAll(): Promise<Inverter[]>;
}
