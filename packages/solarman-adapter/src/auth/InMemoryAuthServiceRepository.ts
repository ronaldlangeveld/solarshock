import {IAuthServiceRepository} from './IAuthServiceRepository';
import {InMemoryRepository} from '@solarshock/in-memory-repository';
import {AuthEntity} from './AuthEntity';

export class InMemoryAuthServiceRepository extends InMemoryRepository<AuthEntity> implements IAuthServiceRepository {
    async create(authEntity: AuthEntity): Promise<AuthEntity> {
        return super.save(authEntity);
    }

    async getLatestAuth(): Promise<AuthEntity> {
        const authEntity = await super.findLatest();
        if (!authEntity) {
            throw new Error('Access token does not exist');
        }
        return authEntity;
    }
}
