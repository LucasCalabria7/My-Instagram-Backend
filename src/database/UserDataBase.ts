import { UserDB } from "../interfaces/interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public create = async (userDB: UserDB) => {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        .insert(userDB);
    }

    public searchByEmail = async (email: string) => {
        const searchedEmail : UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        .select()
        .where({email})
        return searchedEmail[0]
    }
}