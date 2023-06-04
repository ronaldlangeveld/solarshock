import InMemoryRepository from '../../../infrastructure/data/Memory/InMemoryRepository';
import IGridStatusRepository from './IGridStatusRepository';
import GridStatus from '../entities/GridStatus';

class InMemoryGridStatusRepository extends InMemoryRepository<GridStatus> implements IGridStatusRepository {
    async create(gridStatus: GridStatus): Promise<GridStatus> {
        return super.save(gridStatus);
    }

    async findById(id: string): Promise<GridStatus | null> {
        return super.findById(id);
    }

    async findByInverterId(inverterId: string, limit: number, order: string): Promise<GridStatus[] | null> {
        const gridStatuses = await super.findAll();

        if (order === 'desc') {
            return gridStatuses.filter(gridStatus => gridStatus.inverterId === inverterId)
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, limit);
        }

        return gridStatuses.filter(gridStatus => gridStatus.inverterId === inverterId)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .slice(0, limit);
    }

    async findAll(): Promise<GridStatus[]> {
        return super.findAll();
    }
}

export default InMemoryGridStatusRepository;
