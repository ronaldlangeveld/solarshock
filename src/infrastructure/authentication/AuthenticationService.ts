import AuthenticationToken from './AuthenticationToken';
import IAuthenticationRepository from './IAuthenticationRepository';
import IAuthenticationService from './IAuthenticationService';

class AuthenticationService implements IAuthenticationService {
    authenticationTokenRepository : IAuthenticationRepository;

    constructor(authenticationTokenRepository : IAuthenticationRepository) {
        this.authenticationTokenRepository = authenticationTokenRepository;
    }

    async createToken(userId : string) : Promise <AuthenticationToken> {
        const authenticationToken = await AuthenticationToken.create({userId: userId});
        return this
            .authenticationTokenRepository
            .create(authenticationToken);
    }

    async validateToken(token : string) : Promise <AuthenticationToken | null> {
        const authenticationToken = await this
            .authenticationTokenRepository
            .findByToken(token);

        if (authenticationToken === null) {
            throw new Error('Token not found');
        }

        const toJson = authenticationToken.toJson(authenticationToken);

        if (toJson.isExpired) {
            throw new Error('Token expired');
        }
        return authenticationToken;
    }

    async getTokensByUserId(userId : string) : Promise <AuthenticationToken[] | null> {
        const tokens = await this.authenticationTokenRepository.findByUserId(userId);

        if (tokens?.length === 0) {
            return null;
        }
        return tokens;
    }

    async findAll() : Promise <AuthenticationToken[]> {
        return this
            .authenticationTokenRepository
            .findAll();
    }
}

export default AuthenticationService;
