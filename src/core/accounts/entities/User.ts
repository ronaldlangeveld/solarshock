import bcrypt from 'bcrypt';
import crypto from 'crypto';

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
  }
  
  export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

export type UserEntityTypes = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    status: UserStatus;
    accountId: string;
}

export type UserRequestModel = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    status: UserStatus;
    accountId: string;
}

export type UserResponseModel = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    status: UserStatus;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
}

class User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    status: UserStatus;
    accountId: string;

    constructor(data: UserEntityTypes) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.role = data.role;
        this.status = data.status;
        this.accountId = data.accountId;
    }



    toJson(user: User): UserResponseModel {
        return {
            id: user.id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            accountId: user.accountId,
            status: user.status
        };
    }

    async updatePassword(password: string): Promise<string> {
        return this.password = await bcrypt.hash(password, 10);
    }

    static async create(data: UserRequestModel): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const dataset = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            accountId: data.accountId,
            status: data.status
        };
        return new User(
            dataset
        );
    }
}

export default User;
