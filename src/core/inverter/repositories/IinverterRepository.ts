import Inverter from "../entities/Inverter";

interface IInverterRepository {
    create(inverter: Inverter): Promise<Inverter>;
    update(inverter: Inverter): Promise<Inverter>;
    delete(inverter: Inverter): Promise<Inverter>;
    findById(id: string): Promise<Inverter | null>;
    findByName(name: string): Promise<Inverter | null>;
    findByAccountId(accountId: string): Promise<Inverter[]>;
    findAll(): Promise<Inverter[]>;
}

export default IInverterRepository;
