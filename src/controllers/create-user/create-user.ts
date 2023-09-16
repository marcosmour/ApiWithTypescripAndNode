import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository, IcreateUserController } from "./protocols";

export class CreateUserController implements IcreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            // validar se o body existe
            if(!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Please specify a body"
                }
            }
            

            const user = await this.createUserRepository.createUser(httpRequest.body)
            return {
                statusCode: 201,
                body: user,
            }

        } catch (error) { 
            return {
                statusCode: 500,
                body: "Something went wrong"
            }
        }
    }

}