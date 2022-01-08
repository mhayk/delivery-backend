import { prisma } from "../../../../database/prismaClient";
import { hash } from 'bcrypt';

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ username, password }: ICreateClient) {
        // validate if client exists
        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }
        });

        if (clientExists) {
            throw new Error('Client already exists');
        }

        // crypt password
        const hashedPassword = await hash(password, 10);

        // create client
        const newClient = await prisma.clients.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        return newClient
    }
}