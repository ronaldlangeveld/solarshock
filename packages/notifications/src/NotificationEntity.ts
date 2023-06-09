import crypto from 'crypto';

export const NotificationTypes = {
    INVERTEROFFLINE: 'inverter_offline',
    INVERTERONLINE: 'inverter_online',
    INVERTERLOWBATTERY: 'inverter_low_battery',
    INVERTERPOWEROFF: 'inverter_power_off',
    INVERTERPOWERON: 'inverter_power_on'
};

export const NotificationStatus = {
    SENT: 'sent',
    PENDING: 'pending',
    FAILED: 'failed'
};

export type NotificationEntityTypes = {
    id: string;
    createdAt: Date;
    inverterId: string;
    type: typeof NotificationTypes[keyof typeof NotificationTypes];
    message: string;
    status: typeof NotificationStatus[keyof typeof NotificationStatus];
}

export type NotificationRequestModel = {
    inverterId: string;
    type: typeof NotificationTypes[keyof typeof NotificationTypes];
    status: typeof NotificationStatus[keyof typeof NotificationStatus];
}

export type NotificationResponseModel = {
    id: string;
    inverterId: string;
    type: typeof NotificationTypes[keyof typeof NotificationTypes];
    message: string;
    status: typeof NotificationStatus[keyof typeof NotificationStatus];
    createdAt: Date;
}

export class Notification {
    id: string;
    createdAt: Date;
    inverterId: string;
    type: typeof NotificationTypes[keyof typeof NotificationTypes];
    message: string;
    status: typeof NotificationStatus[keyof typeof NotificationStatus];

    constructor(data: NotificationEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.inverterId = data.inverterId;
        this.type = data.type;
        this.message = data.message;
        this.status = data.status;
    }

    toJson(notification: Notification): NotificationResponseModel {
        return {
            id: notification.id,
            inverterId: notification.inverterId,
            type: notification.type,
            message: notification.message,
            status: notification.status,
            createdAt: notification.createdAt
        };
    }

    static async create(data: NotificationRequestModel): Promise<Notification> {
        return new Notification({
            id: crypto.randomUUID(),
            createdAt: new Date(),
            inverterId: data.inverterId,
            type: data.type,
            message: '',
            status: data.status
        });
    }
}
