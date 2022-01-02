import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        // receive username and password from request

        // verify if user exists
        const clientExists = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if (!clientExists) {
            throw new Error('Username or password invalid!');
        }

        // verify if password is correct
        const passwordMatch = await compare(password, clientExists.password);

        if (!passwordMatch) {
            throw new Error('Username or password invalid!');
        }

        // generate token
        const token = sign({ username }, "HAPPY_NEW_YEAR_2022", {
            subject: clientExists.id,
            expiresIn: "1d",
        });


        return token;
    }
}