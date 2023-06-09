import {Notification, NotificationTypes, NotificationStatus} from "../src";

describe('NotificationEntity', () => {
    it('should create a Notification entity', async () => {
        const dataset = {
            inverterId: '1',
            type: NotificationTypes.INVERTEROFFLINE,
            status: 'pending',
        };
        const notification = await Notification.create(dataset);
        console.log(notification);
        expect(notification).toBeInstanceOf(Notification);
    });

    it('should return a Notification entity as JSON', async () => {
        const dataset = {
            inverterId: '1',
            type: NotificationTypes.INVERTEROFFLINE,
            status: 'pending',
        };

        const notification = await Notification.create(dataset);
        const notificationJson = notification.toJson(notification);

        expect(notificationJson).toHaveProperty('id');
        expect(notificationJson).toHaveProperty('createdAt');
        expect(notificationJson).toHaveProperty('inverterId');
        expect(notificationJson).toHaveProperty('type');
        expect(notificationJson).toHaveProperty('message');
        expect(notificationJson).toHaveProperty('status');
    });
});