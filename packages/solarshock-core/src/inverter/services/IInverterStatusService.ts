import InverterStatus from '../entities/InverterStatus';

interface IInverterStatusService {
    createInverterStatus(inverterStatus: InverterStatus): Promise<InverterStatus>;
    findInverterStatusById(id: string): Promise<InverterStatus | null>;
    findInverterStatusByInverterId(inverterId: string, limit: number, order: string): Promise<InverterStatus[] | null>;
    findAllInverterStatus(): Promise<InverterStatus[]>;
}

export default IInverterStatusService;
