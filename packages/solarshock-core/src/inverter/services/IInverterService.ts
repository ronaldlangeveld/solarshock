import {Inverter} from '../entities/Inverter';

export interface IInverterService {
    createInverter(inverter: Inverter): Promise<Inverter>;
    updateInverter(inverter: Inverter): Promise<Inverter>;
    deleteInverter(inverter: Inverter): Promise<Inverter>;
    findInverterById(id: string): Promise<Inverter | null>;
    findInverterByName(name: string): Promise<Inverter | null>;
    findAllInverters(): Promise<Inverter[]>;
}
