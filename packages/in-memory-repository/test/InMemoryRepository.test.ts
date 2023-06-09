import {InMemoryRepository} from '../src/index';

interface ITestEntity {
    id: string;
    name: string;
    age: number;
}

class TestInMemoryRepository extends InMemoryRepository <ITestEntity> {
    async create(testEntity: ITestEntity): Promise<ITestEntity> {
        return super.save(testEntity);
    }

    async update(testEntity: ITestEntity): Promise<ITestEntity> {
        return super.save(testEntity);
    }

    async delete(testEntity: ITestEntity): Promise<ITestEntity> {
        await super.deleteById(testEntity.id);
        return testEntity;
    }

    async findById(id: string): Promise<ITestEntity | null> {
        return super.findById(id);
    }

    async findByName(name: string): Promise<ITestEntity | null> {
        const entities = await super.findAll();
        return entities.find(entity => entity.name === name) || null;
    }
    
    async findAll(): Promise<ITestEntity[]> {
        return super.findAll();
    }
}

describe('InMemoryRepository', function () {
    it('can Create an entity', async function () {
        const repository = new TestInMemoryRepository();
        const entity = {
            id: '1',
            name: 'test',
            age: 10
        };

        const createdEntity = await repository.create(entity);
        expect(createdEntity).toEqual(entity);

    });

    it('can Update an entity', async function () {
        const repository = new TestInMemoryRepository();
        const entity = {
            id: '1',
            name: 'test',
            age: 10
        };

        const createdEntity = await repository.create(entity);
        expect(createdEntity).toEqual(entity);

        const updatedEntity = await repository.update({
            id: '1',
            name: 'test',
            age: 20
        });
        expect(updatedEntity).toEqual({
            id: '1',
            name: 'test',
            age: 20
        });
    });

    it('can Delete an entity', async function () {
        const repository = new TestInMemoryRepository();
        const entity = {
            id: '1',
            name: 'test',
            age: 10
        };

        const createdEntity = await repository.create(entity);
        expect(createdEntity).toEqual(entity);

        const deletedEntity = await repository.delete(createdEntity);
        expect(deletedEntity).toEqual(entity);

        const foundEntity = await repository.findById('1');
        expect(foundEntity).toBeNull();
    });

    it('can Find an entity by id', async function () {
        const repository = new TestInMemoryRepository();
        const entity = {
            id: '1',
            name: 'test',
            age: 10
        };

        const createdEntity = await repository.create(entity);
        expect(createdEntity).toEqual(entity);

        const foundEntity = await repository.findById('1');
        expect(foundEntity).toEqual(entity);
    });

    it('can Find an entity by name', async function () {
        const repository = new TestInMemoryRepository();
        const entity = {
            id: '1',
            name: 'test',
            age: 10
        };

        const createdEntity = await repository.create(entity);
        expect(createdEntity).toEqual(entity);

        const foundEntity = await repository.findByName('test');
        expect(foundEntity).toEqual(entity);
    });

    it('can Find all entities', async function () {
        const repository = new TestInMemoryRepository();

        const entities = [
            {
                id: '1',
                name: 'test',
                age: 10
            },
            {
                id: '2',
                name: 'test2',
                age: 20
            }
        ];

        const createdEntities = await Promise.all(entities.map(entity => repository.create(entity)));
        expect(createdEntities).toEqual(entities);
    });
});