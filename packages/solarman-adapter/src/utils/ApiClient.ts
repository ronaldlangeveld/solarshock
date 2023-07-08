import axios from 'axios';
import {AuthEntity} from '../auth/AuthEntity';
import {StatsEntity} from '@solarshock/solarshock-core';

export type StatusResponseTypes = {
    name: string;
    value: string;
}

export class SolarmanApiClient {
    private appSecret: string;
    private appId: string;
    private email: string;
    private password: string;
    private solarmanBaseApi: string;

    constructor(
        appSecret: string,
        appId: string,
        email: string,
        password: string,
        solarmanBaseApi: string
    ) {
        this.appSecret = appSecret;
        this.appId = appId;
        this.email = email;
        this.password = password;
        this.solarmanBaseApi = solarmanBaseApi;
    }

    public async authenticate(): Promise<AuthEntity> {
        const url = `https://${this.solarmanBaseApi}/account/v1.0/token?appId=${this.appId}&language=en&=`;
        const headers = {
            'Content-Type': 'application/json'
        };
        const body = {
            appSecret: this.appSecret,
            email: this.email,
            password: this.password
        };

        const response = await axios.post(url, body, {headers});

        if (response.status === 200) {
            return AuthEntity.create({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                expiresIn: response.data.expiresIn * 1000 // convert seconds to milliseconds
            });
        } else {
            throw new Error('Failed to authenticate');
        }
    }

    public async getInverterAndGridData(auth: AuthEntity, inverterId: string): Promise<StatsEntity> {
        const url = `https://${this.solarmanBaseApi}/device/v1.0/currentData?appId=${this.appId}&language=en&=`;
        const headers = {
            'Content-Type': 'application/json',
            authorization: `bearer ${auth.accessToken}`
        };
        const body = {
            deviceSn: inverterId
        };

        const status = await (await axios.post(url, body, {headers})).data;

        if (status.status === 200) {
            const gridFrequencyNow = status.find((st:StatusResponseTypes) => st.name === 'Grid Frequency');
            const batteryLevelNow = status.find((st:StatusResponseTypes) => st.name === 'SoC');
            const sunPower = status.find((st:StatusResponseTypes) => st.name === 'Total DC Input Power');
            const consumptionNow = status.find((st:StatusResponseTypes) => st.name === 'Total Consumption Power');

            return StatsEntity.create({
                currentProduction: sunPower ? parseFloat(sunPower.value) : 0,
                currentConsumption: consumptionNow ? parseFloat(consumptionNow.value) : 0,
                batteryLevel: batteryLevelNow ? parseFloat(batteryLevelNow.value) : 0,
                gridFrequency: gridFrequencyNow ? parseFloat(gridFrequencyNow.value) : 0,
                inverterId
            });
        } else {
            throw new Error('Failed to get inverter and grid data');
        }
    }
}
