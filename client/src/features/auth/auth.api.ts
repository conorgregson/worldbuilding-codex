import { api } from "../../lib/api";
import type { AuthUser, LoginInput, RegisterInput } from "./auth.types";

export function registerUser(input: RegisterInput) {
    return api.post<AuthUser>("/api/auth/register", input);
}
export function loginUser(input: LoginInput) {
    return api.post<AuthUser>("/api/auth/login", input);
}
export function logoutUser() {
    return api.post<{ message: string }>("/api/auth/logout");
}
export function getCurrentUser() {
    return api.get<AuthUser>("/api/auth/me");
}