import {AuthEntity} from './AuthEntity';

export interface IAuthServiceRepository {
    create(authEntity: AuthEntity): Promise<AuthEntity>;
    getLatestAuth(): Promise<AuthEntity>;
}
