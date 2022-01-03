import { prisma } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'

interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticateDeliveryman) {
        // receive username and password from request

        // verify if deliveryman exists
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if (!deliveryman) {
            throw new Error('Username or password invalid!');
        }

        // verify if password is correct
        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error('Username or password invalid!');
        }

        // generate token
        const token = sign({ username }, "HAPPY_NEW_YEAR_2022", {
            subject: deliveryman.id,
            expiresIn: "1d",
        });


        return token;
    }
}