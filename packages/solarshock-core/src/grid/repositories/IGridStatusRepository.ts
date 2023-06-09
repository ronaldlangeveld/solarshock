import {GridStatus} from '../entities/GridStatus';

export interface IGridStatusRepository {
    create(gridStatus: GridStatus): Promise<GridStatus>;
    findById(id: string): Promise<GridStatus | null>;
    findByInverterId(inverterId: string, limit: number, order: string): Promise<GridStatus[] | null>;
    findAll(): Promise<GridStatus[]>;
}
