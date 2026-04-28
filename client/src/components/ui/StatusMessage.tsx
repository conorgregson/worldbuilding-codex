import type { PropsWithChildren } from "react";

type StatusVariant = "success" | "error" | "info" | "muted";

type StatusMessageProps = PropsWithChildren<{
  variant?: StatusVariant;
}>;

const colorByVariant: Record<StatusVariant, string> = {
  success: "#86efac",
  error: "#fca5a5",
  info: "#93c5fd",
  muted: "#d1d5db",
};

export function StatusMessage({
  children,
  variant = "info",
}: StatusMessageProps) {
  const isAssertive = variant === "error";

  return (
    <p
      role={isAssertive ? "alert" : "status"}
      aria-live={isAssertive ? "assertive" : "polite"}
      style={{
        margin: 0,
        color: colorByVariant[variant],
      }}
    >
      {children}
    </p>
  );
}