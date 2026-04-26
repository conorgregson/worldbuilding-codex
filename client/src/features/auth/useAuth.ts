import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "./auth.api";
import type { LoginInput, RegisterInput } from "./auth.types";

const AUTH_QUERY_KEY = ["auth", "me"];

export function useCurrentUser() {
    return useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: getCurrentUser,
        retry: false,
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (input: RegisterInput) => registerUser(input),
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: LoginInput) => loginUser(input),
        onSuccess: (user) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, user);
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(AUTH_QUERY_KEY, null);
            queryClient.removeQueries({ queryKey: ["worlds"] });
        },
    });
}