import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserRepository, IcreateUserController } from "./protocols";

import validator from "validator";

export class CreateUserController implements IcreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            // verificar campos obrigatorios
            const requiredFields = ["firstName", "lastName", "email", "password"];
            for(const field of requiredFields) {
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`,
                    }
                }
            }

            // verificar se o email e valido
            const emailIsValid = validator.isEmail(httpRequest.body!.email);
            if(!emailIsValid) {
                return {
                    statusCode: 400,
                    body: "E-mail is invalid"
                }
            }
    
            const user = await this.createUserRepository.createUser(httpRequest.body!)
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