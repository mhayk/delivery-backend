import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token not provided"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "HAPPY_NEW_YEAR_2022") as IPayload;

        request.id_client = sub;

        return next();
    }
    catch (err) {
        return response.status(401).json({
            message: "Token invalid"
        });
    }
}