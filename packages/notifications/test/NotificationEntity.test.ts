import {NotificationEntity} from '../src';

describe('NotificationEntity', function () {
    it('should create a NotificationEntity', function () {
        const notificationEntity = new NotificationEntity({
            id: '123',
            createdAt: new Date(),
            inverterId: '123',
            sent: false,
            sentAt: new Date(),
            reason: '123'
        });

        expect(notificationEntity).toBeInstanceOf(NotificationEntity);
    });

    it('should create a NotificationEntity with toJson', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            reason: '123'
        });

        const notificationEntityJson = notificationEntity.toJson(notificationEntity);

        expect(notificationEntityJson).toHaveProperty('id');
        expect(notificationEntityJson).toHaveProperty('createdAt');
        expect(notificationEntityJson).toHaveProperty('inverterId');
        expect(notificationEntityJson).toHaveProperty('sent');
        expect(notificationEntityJson).toHaveProperty('sentAt');
        expect(notificationEntityJson).toHaveProperty('reason');
    });
});
