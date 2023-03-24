import { UserDB, UserModel, ROLES } from "../interfaces/interfaces";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: ROLES,
        private createdAt: string
    ) { }
    public getId(): string {
        return this.id;
    }

    public setId(value: string): void {
        this.id = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string): void {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string): void {
        this.email = value;
    }
    public getPassword(): string {
        return this.password;
    }

    public setPassword(value: string): void {
        this.password = value;
    }
    public getRole(): ROLES {
        return this.role;
    }

    public setRole(value: ROLES): void {
        this.role = value;
    }
    public getCreatedAt(): string {
        return this.createdAt;
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value;
    }
    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt,
        };
    }
    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
        };
    }
}