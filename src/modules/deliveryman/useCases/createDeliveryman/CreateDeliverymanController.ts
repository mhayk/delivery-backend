import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

export class CreateDeliverymanController {
    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const createClientUseCase = new CreateDeliverymanUseCase();
        const result = await createClientUseCase.execute({
            username,
            password
        })
        return response.json(result);
    }
}