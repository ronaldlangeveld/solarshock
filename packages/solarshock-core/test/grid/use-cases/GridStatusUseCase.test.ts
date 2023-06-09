import GridStatus from '../../../src/grid/entities/GridStatus';
import GridStatusUseCaseImpl from '../../../src/grid/use-cases/GridStatusUseCaseImpl';
import IGridStatusUseCase from '../../../src/grid/use-cases/IGridStatusUseCase';
import InMemoryGridStatusRepository from '../../../src/grid/repositories/InMemoryGridStatusRepository';

describe('Grid Status Use Case', function () {
    let gridStatusUseCase: IGridStatusUseCase;

    beforeEach(function () {
        gridStatusUseCase = new GridStatusUseCaseImpl(new InMemoryGridStatusRepository());
    });

    afterEach(function () {
        jest.useRealTimers();
    });

    describe('Grid Status', function () {
        it('should create a grid status', async function () {
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });
            const createdGridStatus = await gridStatusUseCase.createGridStatus(gridStatus);
            expect(createdGridStatus).toBeInstanceOf(GridStatus);
        });

        it('should not create a grid status if same as previous', async function () {
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });
            await gridStatusUseCase.createGridStatus(gridStatus);
            await expect(gridStatusUseCase.createGridStatus(gridStatus)).rejects.toThrowError();
        });

        it('should find grid status by inverter id', async function () {
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });

            await gridStatusUseCase.createGridStatus(gridStatus);
            const foundGridStatus = await gridStatusUseCase.getGridStatusByInverterId('1', 1, 'desc');
            expect(foundGridStatus).toBeInstanceOf(Array);

            if (foundGridStatus) {
                expect(foundGridStatus[0]).toBeInstanceOf(GridStatus);
            }
        });

        it('should find grid status by id', async function () {
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });

            await gridStatusUseCase.createGridStatus(gridStatus);
            const foundGridStatus = await gridStatusUseCase.getGridStatusById(gridStatus.id);
            expect(foundGridStatus).toBeInstanceOf(GridStatus);
        });

        it('should find all grid statuses', async function () {
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });

            await gridStatusUseCase.createGridStatus(gridStatus);
            const foundGridStatuses = await gridStatusUseCase.getAllGridStatuses();
            expect(foundGridStatuses).toBeInstanceOf(Array);

            if (foundGridStatuses) {
                expect(foundGridStatuses[0]).toBeInstanceOf(GridStatus);
            }
        });

        it('should sort grid statuses in ascending order', async function () {
            jest.useFakeTimers();
            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });

            jest.advanceTimersByTime(10 * 60 * 1000); // 10 minutes

            const gridStatus2 = await GridStatus.create({
                gridFrequency: 60,
                inverterId: '1'
            });
            
            await gridStatusUseCase.createGridStatus(gridStatus);
            await gridStatusUseCase.createGridStatus(gridStatus2);
            const foundGridStatuses = await gridStatusUseCase.getGridStatusByInverterId('1', 2, 'asc');
            expect(foundGridStatuses).toBeInstanceOf(Array);

            if (foundGridStatuses) {
                expect(foundGridStatuses[1].createdAt.getTime()).toBeGreaterThan(foundGridStatuses[0].createdAt.getTime());
            }
        });

        it('should sort grid statuses in descending order', async function () {
            jest.useFakeTimers();

            const gridStatus = await GridStatus.create({
                gridFrequency: 50,
                inverterId: '1'
            });

            jest.advanceTimersByTime(10 * 60 * 1000); // 10 minutes

            const gridStatus2 = await GridStatus.create({
                gridFrequency: 60,
                inverterId: '1'
            });

            await gridStatusUseCase.createGridStatus(gridStatus);
            await gridStatusUseCase.createGridStatus(gridStatus2);
            const foundGridStatuses = await gridStatusUseCase.getGridStatusByInverterId('1', 2, 'desc');
            expect(foundGridStatuses).toBeInstanceOf(Array);
            if (foundGridStatuses) {
                expect(foundGridStatuses[0].createdAt.getTime()).toBeGreaterThan(foundGridStatuses[1].createdAt.getTime());
            }
        });
    });
});
