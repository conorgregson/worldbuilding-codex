import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { env } from "../../config/env";
import { LoginInput, RegisterInput } from "./auth.schema";

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
    });

    if (existingUser) {
        throw new AppError("Email is already in use", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
        data: {
            email: input.email.toLowerCase(),
            passwordHash,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return user;
}

export async function loginUser(input: LoginInput) {
    const user = await prisma.user.findUnique({
        where: { email: input.email.toLowerCase() },
    });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
        {
            sub: user.id,
            email: user.email,
        },
        env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
        },
    };
}

export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
}