import {AuthEntity} from './AuthEntity';

export interface IAuthService {
    getLatestAuth(): Promise<AuthEntity>;
}
