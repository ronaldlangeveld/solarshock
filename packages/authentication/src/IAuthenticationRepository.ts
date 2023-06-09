import {AuthenticationToken} from './';

export interface IAuthenticationRepository {
    create(authenticationToken: AuthenticationToken): Promise<AuthenticationToken>;
    findByUserId(userId: string): Promise<AuthenticationToken[] | null>;
    findByToken(token: string): Promise<AuthenticationToken | null>;
    findAll(): Promise<AuthenticationToken[]>;
}
