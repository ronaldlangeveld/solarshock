import crypto from 'crypto';

type InverterEntityTypes = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    brand: string | null;
    model: string | null;
    serial: string | null;
    maxPower: number | null;
    batteryCapacity: number | null;
}

type InverterRequestModel = {
    name: string;
    brand: string | null;
    model: string | null;
    serial: string | null;
    maxPower: number | null;
    batteryCapacity: number | null;
}

export class Inverter {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    brand: string | null;
    model: string | null;
    serial: string | null;
    maxPower: number | null;
    batteryCapacity: number | null;

    constructor(data: InverterEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.name = data.name;
        this.brand = data.brand;
        this.model = data.model;
        this.serial = data.serial;
        this.maxPower = data.maxPower;
        this.batteryCapacity = data.batteryCapacity;
    }

    toJson(inverter: Inverter): InverterEntityTypes {
        return {
            id: inverter.id,
            createdAt: inverter.createdAt,
            updatedAt: inverter.updatedAt,
            name: inverter.name,
            brand: inverter.brand,
            model: inverter.model,
            serial: inverter.serial,
            maxPower: inverter.maxPower,
            batteryCapacity: inverter.batteryCapacity
        };
    }

    static async create(data: InverterRequestModel): Promise<Inverter> {
        const dataset = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: data.name,
            brand: data.brand,
            model: data.model,
            serial: data.serial,
            maxPower: data.maxPower,
            batteryCapacity: data.batteryCapacity
        };
        return new Inverter(dataset);
    }
}
