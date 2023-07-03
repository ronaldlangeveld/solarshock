import crypto from 'crypto';

export type AuthEntityProps = {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: Date;
    createdAt: Date;
};

export type AuthEntityResponseModel = {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expiresAt: Date;
    createdAt: Date;
};

export type AuthEntityRequestModel = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

export class AuthEntity {
    id: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    createdAt: Date;
    expiresAt: Date;

    constructor(auth: AuthEntityProps) {
        this.id = auth.id;
        this.accessToken = auth.accessToken;
        this.refreshToken = auth.refreshToken;
        this.expiresIn = auth.expiresIn;
        this.createdAt = auth.createdAt;
        this.expiresAt = auth.expiresAt;
    }

    toJson(auth: AuthEntity): AuthEntityProps {
        return {
            id: auth.id,
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            expiresIn: auth.expiresIn,
            createdAt: auth.createdAt,
            expiresAt: auth.expiresAt
        };
    }

    public isExpired(): boolean {
        return this.expiresAt.getTime() < Date.now();
    }

    static async create(auth: AuthEntityRequestModel): Promise<AuthEntity> {
        return new AuthEntity({
            id: crypto.randomBytes(16).toString('hex'),
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            expiresIn: auth.expiresIn,
            expiresAt: new Date(Date.now() + auth.expiresIn),
            createdAt: new Date()
        });
    }
}
