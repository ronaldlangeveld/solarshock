import crypto from 'crypto';

export const NotificationReasons = {
    GRID_DOWN: 'GRID_DOWN',
    GRID_UP: 'GRID_UP',
    BATTERY_LOW: 'BATTERY_LOW',
    BATTERY_SUFFICIENT: 'BATTERY_SUFFICIENT'
};

export type NotificationEntityTypes = {
    id: string;
    createdAt: Date;
    inverterId: string;
    sent: boolean;
    sentAt: Date | null;
    batteryLevel: number;
    gridFrequency: number;
    currentConsumption: number;
    currentProduction: number;
    reason?: string;
}

export type NotificationEntityRequestModel = {
    inverterId: string;
    batteryLevel: number;
    gridFrequency: number;
    currentConsumption: number;
    currentProduction: number;
    reason?: string;
}

export type NotificationEntityResponseModel = {
    id: string;
    createdAt: Date;
    inverterId: string;
    sent: boolean;
    sentAt: Date | null;
    message?: string;
}

export class NotificationEntity {
    id: string;
    createdAt: Date;
    inverterId: string;
    sent: boolean;
    sentAt: Date | null;
    batteryLevel: number;
    gridFrequency: number;
    currentConsumption: number;
    currentProduction: number;
    reason?: string;
    message?: string;

    constructor(data: NotificationEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.inverterId = data.inverterId;
        this.sent = data.sent;
        this.sentAt = data.sentAt;
        this.batteryLevel = data.batteryLevel;
        this.gridFrequency = data.gridFrequency;
        this.currentConsumption = data.currentConsumption;
        this.currentProduction = data.currentProduction;
        this.reason = data.reason;
    }

    toJson(notification: NotificationEntity): NotificationEntityResponseModel {
        return {
            id: notification.id,
            createdAt: notification.createdAt,
            inverterId: notification.inverterId,
            sent: notification.sent,
            sentAt: notification.sentAt,
            message: notification.message
        };
    }

    static async create(data: NotificationEntityRequestModel): Promise<NotificationEntity> {
        const notification = new NotificationEntity({
            id: crypto.randomUUID(),
            createdAt: new Date(),
            inverterId: data.inverterId,
            sent: false,
            sentAt: null,
            batteryLevel: data.batteryLevel,
            gridFrequency: data.gridFrequency,
            currentConsumption: data.currentConsumption,
            currentProduction: data.currentProduction
        });

        notification.reason = data?.reason || await this.generateReason(notification);

        notification.message = await this.generateMessage(notification);

        return notification;
    }
    // for use with text based notifications, eg Telegram
    static async generateMessage(notification: NotificationEntity): Promise<string> {
        let powerStatus = '';
        switch (notification.reason) {
        case NotificationReasons.GRID_DOWN:
            powerStatus = '🚨 POWER IS OFF';
            break;
        case NotificationReasons.GRID_UP:
            powerStatus = '⚡️ POWER IS ON';
            break;
        case NotificationReasons.BATTERY_LOW:
            powerStatus = '🪫 BATTERY IS LOW';
            break;
        case NotificationReasons.BATTERY_SUFFICIENT:
            powerStatus = '🔋 BATTERY IS SUFFICIENT';
            break;
        }
        return `${powerStatus} \n\n🔋 at ${notification.batteryLevel}%\n\n ☀️ Producing ${notification.currentProduction / 1000} kW \n\n 🏡 Current Consumption ${notification.currentConsumption / 1000} kW`;
    }

    // this only checks if the grid is up or down as the battery level is checked in another service
    static async generateReason(notification: NotificationEntity): Promise<string> {
        let reason = '';

        if (notification.gridFrequency === 0) {
            reason = NotificationReasons.GRID_DOWN;
        }

        if (notification.gridFrequency > 0) {
            reason = NotificationReasons.GRID_UP;
        }

        return reason;
    }
}
