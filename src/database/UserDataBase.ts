import { UserDB } from "../interfaces/interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public create = async (userDB: UserDB) => {
        await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        .insert(userDB);
    }

    public searchByName = async (name: string) => {
        const searchedName : UserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
        .select()
        .where({name})

        return searchedName
    }
}