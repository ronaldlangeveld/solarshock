import {NotificationEntity} from '../src';

describe('NotificationEntity', function () {
    it('should create a NotificationEntity', function () {
        const notificationEntity = new NotificationEntity({
            id: '123',
            createdAt: new Date(),
            inverterId: '123',
            sent: false,
            sentAt: new Date(),
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
        });

        expect(notificationEntity).toBeInstanceOf(NotificationEntity);
    });

    it('should generate notification message', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 50,
            currentConsumption: 600,
            currentProduction: 1500
        });

        expect(notificationEntity.message).toBeDefined();
    });

    it('should generate notification message with reason', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
        });

        expect(notificationEntity.message).toBeDefined();
        expect(notificationEntity.reason).toBeDefined();
    });

    it('should create a NotificationEntity with toJson', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 50,
            currentConsumption: 600,
            currentProduction: 1500
        });

        const notificationEntityJson = notificationEntity.toJson(notificationEntity);

        expect(notificationEntityJson).toHaveProperty('id');
        expect(notificationEntityJson).toHaveProperty('createdAt');
        expect(notificationEntityJson).toHaveProperty('inverterId');
        expect(notificationEntityJson).toHaveProperty('sent');
        expect(notificationEntityJson).toHaveProperty('sentAt');
        expect(notificationEntityJson).toHaveProperty('message');
    });

    it('can generate power off message', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 0,
            currentConsumption: 600,
            currentProduction: 1500
        });

        expect(notificationEntity.message?.includes('🚨 POWER IS OFF')).toBe(true);
    });

    it('can generate power on message', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 89,
            gridFrequency: 50,
            currentConsumption: 600,
            currentProduction: 1500
        });

        expect(notificationEntity.message?.includes('⚡️ POWER IS ON')).toBe(true);
    });

    it('can generate battery low message', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 10,
            gridFrequency: 50,
            currentConsumption: 600,
            currentProduction: 1500,
            reason: 'BATTERY_LOW'
        });

        expect(notificationEntity.message?.includes('🪫 BATTERY IS LOW')).toBe(true);
    });

    it('can generate battery sufficient message', async function () {
        const notificationEntity = await NotificationEntity.create({
            inverterId: '123',
            batteryLevel: 91,
            gridFrequency: 50,
            currentConsumption: 600,
            currentProduction: 1500,
            reason: 'BATTERY_SUFFICIENT'
        });
        expect(notificationEntity.message?.includes('🔋 BATTERY IS SUFFICIENT')).toBe(true);
    });
});
