import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [{
            firstName: "Marcos",
            lastName: "Moura",
            email: "marcosmoura201@",
            password: "123"
        }]
    }

}