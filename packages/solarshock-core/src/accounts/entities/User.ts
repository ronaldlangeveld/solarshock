import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const UserRoles = {
    ADMIN: 'admin' as const,
    USER: 'user' as const
}

export const UserStatus = {
    ACTIVE: 'active' as const,
    INACTIVE: 'inactive' as const,
    BANNED: 'banned' as const
}

export type UserEntityTypes = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: typeof UserRoles[keyof typeof UserRoles]; 
    status: typeof UserStatus[keyof typeof UserStatus]; 
}

export type UserRequestModel = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: typeof UserRoles[keyof typeof UserRoles]; 
    status: typeof UserStatus[keyof typeof UserStatus];
}

export type UserResponseModel = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: typeof UserRoles[keyof typeof UserRoles]; 
    status: typeof UserStatus[keyof typeof UserStatus];
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
    role: typeof UserRoles[keyof typeof UserRoles]; 
    status: typeof UserStatus[keyof typeof UserStatus];

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
            status: user.status
        };
    }

    async updatePassword(password: string): Promise<string> {
        return this.password = await bcrypt.hash(password, 10);
    }

    static async create(data: UserRequestModel): Promise<User> {
        // we need to make sure they have a password
        if (!data.password || data.password === '') {
            throw new Error('Password cannot be empty');
        }

        // we need to make sure they have an email
        if (!data.email || data.email === '') {
            throw new Error('Email cannot be empty');
        }

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
            status: data.status
        };
        return new User(
            dataset
        );
    }
}

export default User;
