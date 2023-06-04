import InMemoryRepository from '../data/Memory/InMemoryRepository';
import IAuthenticationRepository from './IAuthenticationRepository';
import AuthenticationToken from './AuthenticationToken';

class InMemoryAuthenticationRepository extends InMemoryRepository<AuthenticationToken> implements IAuthenticationRepository {
    async create(authenticationToken: AuthenticationToken): Promise<AuthenticationToken> {
        return super.save(authenticationToken);
    }

    async findByUserId(userId: string): Promise<AuthenticationToken[] | null> {
        const authenticationTokens = await super.findAll();
        const tokens = authenticationTokens.filter(
            authenticationToken => authenticationToken.userId === userId
        );
        return tokens.length > 0 ? tokens : null;
    }

    async findByToken(token: string): Promise<AuthenticationToken | null> {
        const authenticationTokens = await super.findAll();
        return authenticationTokens.find(authenticationToken => authenticationToken.token === token) || null;
    }

    async findAll(): Promise<AuthenticationToken[]> {
        return super.findAll();
    }
}

export default InMemoryAuthenticationRepository;
