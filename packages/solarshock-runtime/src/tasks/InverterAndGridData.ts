import {
    StatsEntity, 
    IInverterService,
    InverterStatus,
    IGridStatusService,
    GridStatus,
    IInverterStatusService
} from '@solarshock/solarshock-core';
import {IDataSource} from '../adapters/IDataSource';

export class InverterAndGridDataTask {
    private readonly _dataSource: IDataSource<StatsEntity>;
    private readonly _inverters: IInverterService;
    private readonly _gridStatus: IGridStatusService;
    private readonly _inverterStatus: IInverterStatusService;

    constructor(
        dataSource: IDataSource<StatsEntity>, 
        inverterService:IInverterService, 
        gridStatusService: IGridStatusService,
        inverterStatusService: IInverterStatusService) {
        this._dataSource = dataSource;
        this._inverters = inverterService;
        this._gridStatus = gridStatusService;
        this._inverterStatus = inverterStatusService;
    }

    async run(): Promise<void> {
        // Use _dataSource to fetch data and perform operations
        const inverters = await this._inverters.findAllInverters();
        for (const inverter of inverters) {
            const data = await this._dataSource.fetchData(inverter.id);
            const gridStatus = await GridStatus.create({
                inverterId: inverter.id,
                gridFrequency: data.gridFrequency
            });

            const inverterStatus = await InverterStatus.create({
                inverterId: inverter.id,
                currentProduction: data.currentProduction,
                currentConsumption: data.currentConsumption,
                batteryLevel: data.batteryLevel
            });

            await this._gridStatus.createGridStatus(gridStatus);
            await this._inverterStatus.createInverterStatus(inverterStatus);
        }

        return;
    }

    // Other methods as needed...
}
