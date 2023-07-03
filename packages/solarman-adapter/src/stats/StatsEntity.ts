import crypto from 'crypto';

export type StatsEntityProps = {
    id: string;
    timestamp: Date;
    currentProduction: number;
    currentConsumption: number;
    batteryLevel: number;
    gridFrequency: number;
    inverterId: string;
};

export type StatsEntityResponseModel = {
    id: string;
    timestamp: Date;
    currentProduction: number;
    currentConsumption: number;
    batteryLevel: number;
    gridFrequency: number;
    inverterId: string;
};

export type StatsEntityRequestModel = {
    currentProduction: number;
    currentConsumption: number;
    batteryLevel: number;
    gridFrequency: number;
    inverterId: string;
};

export class StatsEntity {
    id: string;
    timestamp: Date;
    currentProduction: number;
    currentConsumption: number;
    batteryLevel: number;
    gridFrequency: number;
    inverterId: string;

    constructor(dataset: StatsEntityProps) {
        this.id = dataset.id;
        this.timestamp = dataset.timestamp;
        this.currentProduction = dataset.currentProduction;
        this.currentConsumption = dataset.currentConsumption;
        this.batteryLevel = dataset.batteryLevel;
        this.gridFrequency = dataset.gridFrequency;
        this.inverterId = dataset.inverterId;
    }

    toJson(stats: StatsEntity): StatsEntityResponseModel {
        return {
            id: stats.id,
            timestamp: stats.timestamp,
            currentProduction: stats.currentProduction,
            currentConsumption: stats.currentConsumption,
            batteryLevel: stats.batteryLevel,
            gridFrequency: stats.gridFrequency,
            inverterId: stats.inverterId
        };
    }

    static async create(stats: StatsEntityRequestModel): Promise<StatsEntity> {
        return new StatsEntity({
            id: crypto.randomBytes(16).toString('hex'),
            timestamp: new Date(),
            currentProduction: stats.currentProduction,
            currentConsumption: stats.currentConsumption,
            batteryLevel: stats.batteryLevel,
            gridFrequency: stats.gridFrequency,
            inverterId: stats.inverterId
        });
    }
}
