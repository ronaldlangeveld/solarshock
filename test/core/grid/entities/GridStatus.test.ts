import GridStatus from '../../../../src/core/grid/entities/GridStatus';

describe('Grid Status Entity', function() {
    it('should create a grid status entity', async function() {
        const dataset = {
            gridFrequency: 50,
            inverterId: '1'
        }
        const gridStatus = await GridStatus.create(dataset);
        expect(gridStatus).toBeInstanceOf(GridStatus);
    });

    it('should return a grid status entity as JSON', async function() {
        const dataset = {
            gridFrequency: 50,
            inverterId: '1'
        }
        const gridStatus = await GridStatus.create(dataset);

        const gridStatusJson = gridStatus.toJson(gridStatus);

        expect(gridStatusJson).toHaveProperty('id');
        expect(gridStatusJson).toHaveProperty('createdAt');
        expect(gridStatusJson).toHaveProperty('gridFrequency');
        expect(gridStatusJson).toHaveProperty('inverterId');
    });
});
