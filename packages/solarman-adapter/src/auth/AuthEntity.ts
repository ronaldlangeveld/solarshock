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
    private readonly _id: string;
    private readonly _accessToken: string;
    private readonly _refreshToken: string;
    private readonly _expiresIn: number;
    private readonly _createdAt: Date;
    private readonly _expiresAt: Date;

    constructor(auth: AuthEntityProps) {
        this._id = auth.id;
        this._accessToken = auth.accessToken;
        this._refreshToken = auth.refreshToken;
        this._expiresIn = auth.expiresIn;
        this._createdAt = auth.createdAt;
        this._expiresAt = auth.expiresAt;
    }

    toJson(auth: AuthEntity): AuthEntityResponseModel {
        return {
            id: auth.id,
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            expiresIn: auth.expiresIn,
            createdAt: auth.createdAt,
            expiresAt: auth.expiresAt
        };
    }

    get id(): string {
        return this._id;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    get expiresIn(): number {
        // expires in milliseconds from creation date, data from Solarman
        return this._expiresIn;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get expiresAt(): Date {
        return this._expiresAt;
    }

    public isExpired(): boolean {
        return this._expiresAt.getTime() < Date.now();
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
// new Date().getTime() + response.data.expires_in