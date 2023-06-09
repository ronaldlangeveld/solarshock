import {GridStatus} from '../entities/GridStatus';
import {IGridStatusRepository} from '../repositories/IGridStatusRepository';
import {IGridStatusService} from './IGridStatusService';

export class GridStatusServiceImpl implements IGridStatusService {
    IGridStatusRepository: IGridStatusRepository;

    constructor(IGridStatusRepository: IGridStatusRepository) {
        this.IGridStatusRepository = IGridStatusRepository;
    }

    async createGridStatus(gridStatus: GridStatus): Promise<GridStatus> {
        const previousGridStatus = await this.IGridStatusRepository.findByInverterId(gridStatus.inverterId, 1, 'desc');
        
        if (previousGridStatus !== null && previousGridStatus.length > 0) {
            if (previousGridStatus[0].gridFrequency === gridStatus.gridFrequency) {
                throw new Error('Grid status is the same as previous');
            }
        }
        return this.IGridStatusRepository.create(gridStatus);
    }

    async getGridStatusById(id: string): Promise<GridStatus | null> {
        return this.IGridStatusRepository.findById(id);
    }

    async getGridStatusByInverterId(inverterId: string, limit: number, order: string): Promise<GridStatus[] | null> {
        return this.IGridStatusRepository.findByInverterId(inverterId, limit, order);
    }

    async getAllGridStatuses(): Promise<GridStatus[]> {
        return this.IGridStatusRepository.findAll();
    }
}
