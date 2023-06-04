import crypto from 'crypto';

type GridStatusEntityTypes = {
    id: string;
    createdAt: Date;
    gridFrequency: number;
    inverterId: string;
}

type GridStatusRequestModel = {
    gridFrequency: number;
    inverterId: string;
}

class GridStatus {
    id: string;
    createdAt: Date;
    gridFrequency: number;
    inverterId: string;

    constructor(data: GridStatusEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.gridFrequency = data.gridFrequency;
        this.inverterId = data.inverterId;
    }

    toJson(gridStatus: GridStatus): GridStatusEntityTypes {
        return {
            id: gridStatus.id,
            createdAt: gridStatus.createdAt,
            gridFrequency: gridStatus.gridFrequency,
            inverterId: gridStatus.inverterId
        };
    }

    static async create(gridStatus: GridStatusRequestModel): Promise<GridStatus> {
        const dataset = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            gridFrequency: gridStatus.gridFrequency,
            inverterId: gridStatus.inverterId
        };

        return new GridStatus(dataset);
    }
}

export default GridStatus;
