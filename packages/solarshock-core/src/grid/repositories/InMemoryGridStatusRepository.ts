import {InMemoryRepository} from '@solarshock/in-memory-repository';
import {IGridStatusRepository} from './IGridStatusRepository';
import {GridStatus} from '../entities/GridStatus';

export class InMemoryGridStatusRepository extends InMemoryRepository<GridStatus> implements IGridStatusRepository {
    async create(gridStatus: GridStatus): Promise<GridStatus> {
        return super.save(gridStatus);
    }

    async findById(id: string): Promise<GridStatus | null> {
        return super.findById(id);
    }

    async findByInverterId(inverterId: string, limit: number, order: string): Promise<GridStatus[] | null> {
        const gridStatuses = await super.findAll();

        if (order === 'desc') {
            return gridStatuses.filter((gridStatus:GridStatus) => gridStatus.inverterId === inverterId)
                .sort((a:GridStatus, b:GridStatus) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, limit);
        }

        return gridStatuses.filter((gridStatus:GridStatus) => gridStatus.inverterId === inverterId)
            .sort((a:GridStatus, b:GridStatus) => a.createdAt.getTime() - b.createdAt.getTime())
            .slice(0, limit);
    }

    async findAll(): Promise<GridStatus[]> {
        return super.findAll();
    }
}
