import {NotificationEntity} from './';

export interface INotificationRepository {
    create(notification: NotificationEntity): Promise<NotificationEntity>;
    update(notification: NotificationEntity): Promise<NotificationEntity>;
    delete(notification: NotificationEntity): Promise<NotificationEntity | void>;
    getNotificationsByInverterId(inverterId: string, order: string, limit: number): Promise<NotificationEntity[]>;
    get(id: string): Promise<NotificationEntity | null>;
    list(order: string, limit: number): Promise<NotificationEntity[]>;
}
