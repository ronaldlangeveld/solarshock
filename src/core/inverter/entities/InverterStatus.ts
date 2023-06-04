import crypto from 'crypto';

export type InverterStatusEntityTypes = {
    id: string;
    createdAt: Date;
    inverterId: string;
    batteryLevel: number;
    currentConsumption: number;
    currentProduction: number;
}

export type InverterStatusRequestModel = {
    inverterId: string;
    batteryLevel: number;
    currentConsumption: number;
    currentProduction: number;
}

class InverterStatus {
    id: string;
    createdAt: Date;
    inverterId: string;
    batteryLevel: number;
    currentConsumption: number;
    currentProduction: number;

    constructor(data: InverterStatusEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.inverterId = data.inverterId;
        this.batteryLevel = data.batteryLevel;
        this.currentConsumption = data.currentConsumption;
        this.currentProduction = data.currentProduction;
    }

    toJson(inverterStatus: InverterStatus): InverterStatusEntityTypes {
        return {
            id: inverterStatus.id,
            createdAt: inverterStatus.createdAt,
            inverterId: inverterStatus.inverterId,
            batteryLevel: inverterStatus.batteryLevel,
            currentConsumption: inverterStatus.currentConsumption,
            currentProduction: inverterStatus.currentProduction
        };
    }

    static async create(data: InverterStatusRequestModel): Promise<InverterStatus> {
        const dataset = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            inverterId: data.inverterId,
            batteryLevel: data.batteryLevel,
            currentConsumption: data.currentConsumption,
            currentProduction: data.currentProduction
        };

        return new InverterStatus(dataset);
    }
}

export default InverterStatus;
