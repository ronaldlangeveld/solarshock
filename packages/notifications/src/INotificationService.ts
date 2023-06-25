import {NotificationEntity} from './';

export interface INotificationService {
    createNotification(notification: NotificationEntity, metadata: unknown): Promise<NotificationEntity>;
    updateNotification(notification: NotificationEntity): Promise<NotificationEntity>;
    deleteNotification(notification: NotificationEntity): Promise<NotificationEntity | void>;
    getNotification(id: string): Promise<NotificationEntity | null>;
    listNotifications(order: string, limit: number): Promise<NotificationEntity[]>;
    listNotificationsByInverterId(inverterId: string, order: string, limit: number): Promise<NotificationEntity[]>;
}
