import express from "express";
import { config } from "dotenv";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

config();

// Rota publica e de teste


const main = async () => {
  const app = express();

  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("Hello World! marcos");
  });
  
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
  
    const getUsersController = new GetUserController(mongoGetUsersRepository);
  
    const { body, statusCode } = await getUsersController.handle();
  
    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

main()
