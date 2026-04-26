export type AuthUser = {
    id: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
};

export type RegisterInput = {
    email: string;
    password: string;
};

export type LoginInput = {
    email: string;
    password: string;
};