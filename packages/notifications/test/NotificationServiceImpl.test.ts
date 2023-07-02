import {NotificationServiceImpl} from '../src/NotificationServiceImpl';
import {InMemoryNotificationRepository} from '../src/InMemoryNotificationRepository';
import {NotificationEntity} from '../src/Notification';

describe('NotificationServiceImpl', function () {
    let notificationServiceImpl: NotificationServiceImpl;

    const dataset = {
        inverterId: '1234',
        batteryLevel: 89,
        gridFrequency: 50,
        currentConsumption: 600,
        currentProduction: 1500
    };

    beforeEach(function () {
        notificationServiceImpl = new NotificationServiceImpl(new InMemoryNotificationRepository());
    });

    it('should create a NotificationServiceImpl', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        const newNotificationEntity = await notificationServiceImpl.createNotification(notificationEntity);

        expect(newNotificationEntity).toBeInstanceOf(NotificationEntity);
    });

    it('should not create new notification if data did not change', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);
        
        await expect(notificationServiceImpl.createNotification(notificationEntity)).rejects.toThrow('Notification already exists');
    });

    it('should update a NotificationServiceImpl', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        const newNotificationEntity = await notificationServiceImpl.createNotification(notificationEntity);

        newNotificationEntity.sent = true;

        newNotificationEntity.sentAt = new Date();

        const updatedNotificationEntity = await notificationServiceImpl.updateNotification(newNotificationEntity);

        expect(updatedNotificationEntity.sent).toBe(true);
    });

    it('can delete a notification', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        const newNotificationEntity = await notificationServiceImpl.createNotification(notificationEntity);

        const deletedNotificationEntity = await notificationServiceImpl.deleteNotification(newNotificationEntity);

        expect(deletedNotificationEntity).toBeUndefined();
    });

    it('can get a notification', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        const newNotificationEntity = await notificationServiceImpl.createNotification(notificationEntity);

        const foundNotificationEntity = await notificationServiceImpl.getNotification(newNotificationEntity.id);

        expect(foundNotificationEntity).toBeInstanceOf(NotificationEntity);
    });

    it('can list notifications', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);

        const notifications = await notificationServiceImpl.listNotifications('asc', 10);

        expect(notifications).toBeInstanceOf(Array);
    });

    it('can list notifications in descending order', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);

        const notificationEntity2 = await NotificationEntity.create({
            inverterId: '1234',
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
        });

        jest.useFakeTimers();

        jest.advanceTimersByTime(2 * 60 * 60 * 1000); // 2 hours

        await notificationServiceImpl.createNotification(notificationEntity2);

        const notifications = await notificationServiceImpl.listNotifications('desc', 10);

        expect(notifications).toBeInstanceOf(Array);
    });

    it('can list notifications by inverterId', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);

        const notifications = await notificationServiceImpl.listNotificationsByInverterId('1234', 'asc', 10);

        expect(notifications).toBeInstanceOf(Array);
    });

    it('can list notifications by inverterId in descending order', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);

        const notificationEntity2 = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
            
        });

        jest.useFakeTimers();

        jest.advanceTimersByTime(2 * 60 * 60 * 1000); // 2 hours

        await notificationServiceImpl.createNotification(notificationEntity2);

        const notifications = await notificationServiceImpl.listNotificationsByInverterId('1234', 'desc', 10);

        expect(notifications).toBeInstanceOf(Array);
    });

    it('can list notifications by inverterId in descending order with limit', async function () {
        const notificationEntity = await NotificationEntity.create(dataset);

        await notificationServiceImpl.createNotification(notificationEntity);

        const notificationEntity2 = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
        });

        jest.useFakeTimers();

        jest.advanceTimersByTime(2 * 60 * 60 * 1000); // 2 hours

        await notificationServiceImpl.createNotification(notificationEntity2);

        const notifications = await notificationServiceImpl.listNotificationsByInverterId('1234', 'desc', 1);

        expect(notifications).toBeInstanceOf(Array);
    });

    it('throws if inverter have no notifications', async function () {
        await expect(notificationServiceImpl.listNotificationsByInverterId('12346', 'desc', 1)).rejects.toThrow('No notifications found');
    });
});
