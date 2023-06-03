import IInverterStatusRepository from "./IInverterStatusRepository";
import InverterStatus from "../entities/InverterStatus";
import InMemoryRepository from "../../../infrastructure/InMemoryRepository";

class InMemoryInverterStatusRepository extends InMemoryRepository<InverterStatus> implements IInverterStatusRepository {
    async create(inverterStatus: InverterStatus): Promise<InverterStatus> {
        return super.save(inverterStatus);
    }

    async findById(id: string): Promise<InverterStatus | null> {
        return super.findById(id);
    }

    async findByInverterId(inverterId: string, limit: number, order: string): Promise<InverterStatus[] | null> {
        const inverterStatuses = await super.findAll();

        if (order === 'desc') {
            return inverterStatuses.filter((inverterStatus) => inverterStatus.inverterId === inverterId)
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, limit);
        }

        return inverterStatuses.filter((inverterStatus) => inverterStatus.inverterId === inverterId)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .slice(0, limit);
    }

    async findAll(): Promise<InverterStatus[]> {
        return super.findAll();
    }
};

export default InMemoryInverterStatusRepository;
