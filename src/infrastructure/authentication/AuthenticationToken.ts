import crypto from 'crypto';

export type AuthenticationTokenTypes = {
    id: string;
    createdAt: Date;
    expiresAt: Date;
    userId: string;
    token: string;
}

export type AuthenticationTokenRequestModel = {
    userId: string;
}

export type AuthenticationTokenResponseModel = {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
}

class AuthenticationToken {
    id: string;
    createdAt: Date;
    expiresAt: Date;
    userId: string;
    token: string;

    constructor(data: AuthenticationTokenTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.expiresAt = data.expiresAt;
        this.userId = data.userId;
        this.token = data.token;
    }

    static async create(data: AuthenticationTokenRequestModel): Promise<AuthenticationToken> {
        const token = crypto.randomBytes(64).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);

        const authenticationToken = new AuthenticationToken({
            id: '',
            createdAt: new Date(),
            expiresAt: expiresAt,
            userId: data.userId,
            token: token
        });

        return authenticationToken;
    }

    toJson(authenticationToken: AuthenticationToken): AuthenticationTokenResponseModel {
        return {
            id: authenticationToken.id,
            userId: authenticationToken.userId,
            token: authenticationToken.token,
            expiresAt: authenticationToken.expiresAt,
            createdAt: authenticationToken.createdAt
        };
    }
}

export default AuthenticationToken;
