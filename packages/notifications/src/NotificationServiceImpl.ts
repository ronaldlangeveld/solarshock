import {
    NotificationEntity,
    INotificationService,
    INotificationRepository
} from '.';

export class NotificationServiceImpl implements INotificationService {
    private readonly repository: INotificationRepository;

    constructor(repository: INotificationRepository) {
        this.repository = repository;
    }

    async createNotification(notification: NotificationEntity): Promise<NotificationEntity> {
        const latest = await this.repository.list('desc', 1);

        if (latest.length > 0) {
            if (latest[0].reason === notification.reason) {
                throw new Error('Notification already exists');
            }
        }

        return await this.repository.create(notification);
    }

    async updateNotification(notification: NotificationEntity): Promise<NotificationEntity> {
        return await this.repository.update(notification);
    }

    async deleteNotification(notification: NotificationEntity): Promise<NotificationEntity | void> {
        return await this.repository.delete(notification);
    }

    async getNotification(id: string): Promise<NotificationEntity | null> {
        return await this.repository.get(id);
    }

    async listNotifications(order:string, limit: number): Promise<NotificationEntity[]> {
        return await this.repository.list(order, limit);
    }

    async listNotificationsByInverterId(inverterId: string, order: string, limit: number): Promise<NotificationEntity[]> {
        return await this.repository.getNotificationsByInverterId(inverterId, order, limit);
    }
}
