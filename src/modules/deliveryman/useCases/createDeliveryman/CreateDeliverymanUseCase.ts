import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';

interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        // validate if deliveryman exists
        const deliverymanExists = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: 'insensitive'
                }
            }
        });

        if (deliverymanExists) {
            throw new Error('Deliveryman already exists');
        }

        // crypt password
        const hashedPassword = await hash(password, 10);

        // create deliveryman
        const newDeliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        return newDeliveryman
    }
}