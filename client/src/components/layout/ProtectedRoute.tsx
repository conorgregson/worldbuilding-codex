import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { useCurrentUser } from "../../features/auth/useAuth";

export function ProtectedRoute({ children }: PropsWithChildren) {
    const { data: user, isLoading, isError } = useCurrentUser();

    if (isLoading) {
        return <div style={{ padding: 24 }}>Loading...</div>
    }

    if (isError || !user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}