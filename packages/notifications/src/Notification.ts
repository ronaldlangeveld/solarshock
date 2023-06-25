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
    reason: typeof NotificationReasons[keyof typeof NotificationReasons];
}

export type NotificationEntityRequestModel = {
    inverterId: string;
    reason: typeof NotificationReasons[keyof typeof NotificationReasons];
}

export type NotificationEntityResponseModel = {
    id: string;
    createdAt: Date;
    inverterId: string;
    sent: boolean;
    sentAt: Date | null;
    reason: typeof NotificationReasons[keyof typeof NotificationReasons];
}

export class NotificationEntity {
    id: string;
    createdAt: Date;
    inverterId: string;
    sent: boolean;
    sentAt: Date | null;
    reason: typeof NotificationReasons[keyof typeof NotificationReasons];

    constructor(data: NotificationEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.inverterId = data.inverterId;
        this.sent = data.sent;
        this.sentAt = data.sentAt;
        this.reason = data.reason;
    }

    toJson(notification: NotificationEntity): NotificationEntityResponseModel {
        return {
            id: notification.id,
            createdAt: notification.createdAt,
            inverterId: notification.inverterId,
            sent: notification.sent,
            sentAt: notification.sentAt,
            reason: notification.reason
        };
    }

    static async create(data: NotificationEntityRequestModel): Promise<NotificationEntity> {
        const notification = new NotificationEntity({
            id: crypto.randomUUID(),
            createdAt: new Date(),
            inverterId: data.inverterId,
            sent: false,
            sentAt: null,
            reason: data.reason
        });

        return notification;
    }
}
