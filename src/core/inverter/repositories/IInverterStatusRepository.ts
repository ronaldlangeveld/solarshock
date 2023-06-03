import InverterStatus from "../entities/InverterStatus";

interface IInverterStatusRepository {
    create(inverterStatus: InverterStatus): Promise<InverterStatus>;
    findById(id: string): Promise<InverterStatus | null>;
    findByInverterId(inverterId: string, limit: number, order: string): Promise<InverterStatus[] | null>;
    findAll(): Promise<InverterStatus[]>;
}

export default IInverterStatusRepository;
