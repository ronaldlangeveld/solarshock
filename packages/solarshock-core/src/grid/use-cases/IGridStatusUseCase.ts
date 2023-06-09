import GridStatus from '../entities/GridStatus';

interface IGridStatusUseCase {
    createGridStatus(gridStatus: GridStatus): Promise<GridStatus>;
    getGridStatusById(id: string): Promise<GridStatus | null>;
    getGridStatusByInverterId(inverterId: string, limit: number, order: string): Promise<GridStatus[] | null>;
    getAllGridStatuses(): Promise<GridStatus[]>;
}

export default IGridStatusUseCase;
