import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
        const users = await this.getUserRepository.getUsers();

        return ok<User[]>(users)
    } catch (error) {
        return serverError()
    }
  }
}
