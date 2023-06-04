import AuthenticationToken from './AuthenticationToken';

interface IAuthenticationService {
    createToken(userId: string): Promise<AuthenticationToken>;
    validateToken(token: string): Promise<AuthenticationToken | null>;
    getTokensByUserId(userId: string): Promise<AuthenticationToken[] | null>;
    findAll(): Promise<AuthenticationToken[]>;
}

export default IAuthenticationService;
