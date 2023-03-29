import { UserDatabase } from "../database/UserDataBase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../DTOs/DTOs";
import { ROLES, TokenPayload, UserDB } from "../interfaces/interfaces";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO) => {
        
        const { name, email, password } = input;

        const id = this.idGenerator.generate();

        if (typeof name !== "string") {
            throw new Error("Name should be a string");
        }

        if (typeof email !== "string") {
            throw new Error("Email should be a string");
        }

        if (typeof password !== "string") {
            throw new Error("Password should be a string");
        }

        const hashedPassword = await this.hashManager.hash(password);

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            ROLES.ADM,
            new Date().toISOString()
        );

        const userDB = newUser.toDBModel();

        await this.userDatabase.create(userDB);

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole(),
        };

        const token = this.tokenManager.createToken(payload);

        const output: SignupOutputDTO = {
            token,
        };
        return output;
    };

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input;

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string");
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string");
        }

        const userDB: UserDB | undefined = await this.userDatabase.searchByEmail(email);

        if (!userDB) {
            throw new Error("This Email is not registered");
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        );

        const isPasswordCorrect = await this.hashManager.compare(
            password,
            user.getPassword()
        ); 

        if (!isPasswordCorrect) {
            throw new Error("Wrong password, try again.");
        }
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),
        };
        const token = this.tokenManager.createToken(payload);
        const output: LoginOutputDTO = {
            message: "Successfull Login",
            token,
        };
        return output;
    };
}