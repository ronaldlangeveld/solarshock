import {InverterStatus} from '../entities/InverterStatus';
import {IInverterStatusRepository} from '../repositories/IInverterStatusRepository';
import {IInverterStatusService} from './IInverterStatusService';

export class InverterStatusServiceImpl implements IInverterStatusService {
    IInverterStatusRepository: IInverterStatusRepository;

    constructor(IInverterStatusRepository: IInverterStatusRepository) {
        this.IInverterStatusRepository = IInverterStatusRepository;
    }

    async createInverterStatus(inverterStatus: InverterStatus): Promise<InverterStatus> {
        return this.IInverterStatusRepository.create(inverterStatus);
    }

    async findInverterStatusById(id: string): Promise<InverterStatus | null> {
        return this.IInverterStatusRepository.findById(id);
    }

    async findInverterStatusByInverterId(inverterId: string, limit: number, order: string): Promise<InverterStatus[] | null> {
        return this.IInverterStatusRepository.findByInverterId(inverterId, limit, order);
    }

    async findAllInverterStatus(): Promise<InverterStatus[]> {
        return this.IInverterStatusRepository.findAll();
    }
}
