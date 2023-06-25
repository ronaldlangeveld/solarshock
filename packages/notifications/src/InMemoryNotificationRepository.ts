import {INotificationRepository, NotificationEntity} from './';
import {InMemoryRepository} from '@solarshock/in-memory-repository';

export class InMemoryNotificationRepository extends InMemoryRepository<NotificationEntity> implements INotificationRepository {
    constructor() {
        super();
    }

    async create(notification: NotificationEntity): Promise<NotificationEntity> {
        return await super.save(notification);
    }

    async delete(notification: NotificationEntity): Promise<NotificationEntity|void> {
        return await super.deleteById(notification.id);
    }

    async get(id: string): Promise<NotificationEntity | null> {
        return await super.findById(id);
    }

    async getNotificationsByInverterId(inverterId: string, order: string, limit: number): Promise<NotificationEntity[]> {
        const notifications = await super.findAll();
        const filtered = notifications.filter((notification:NotificationEntity) => notification.inverterId === inverterId);

        if (filtered.length === 0) {
            throw new Error('No notifications found');
        }

        if (order === 'desc') {
            return filtered.sort((a:NotificationEntity, b:NotificationEntity) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
        }

        return filtered.sort((a:NotificationEntity, b:NotificationEntity) => a.createdAt.getTime() - b.createdAt.getTime()).slice(0, limit);
    }

    async update(notification: NotificationEntity): Promise<NotificationEntity> {
        return await super.save(notification);
    }

    async list(order: string, limit: number): Promise<NotificationEntity[]> {
        const notifications = await super.findAll();
        if (order === 'desc') {
            return notifications.sort((a:NotificationEntity, b:NotificationEntity) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
        }
        return notifications.sort((a:NotificationEntity, b:NotificationEntity) => a.createdAt.getTime() - b.createdAt.getTime()).slice(0, limit);
    }
}
