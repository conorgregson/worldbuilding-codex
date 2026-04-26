import type { ButtonHTMLAttributes, CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--color-primary)",
    color: "var(--color-text-strong)",
    border: "1px solid var(--color-primary)",
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.18)",
  },
  secondary: {
    background: "var(--color-surface-2)",
    color: "var(--color-text-strong)",
    border: "1px solid var(--color-border-strong)",
  },
  danger: {
    background: "var(--color-danger)",
    color: "var(--color-text-strong)",
    border: "1px solid var(--color-danger)",
    boxShadow: "0 10px 24px rgba(185, 28, 28, 0.16)",
  },
};

export function Button({
  children,
  variant = "primary",
  style,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={["ui-button", `ui-button--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        minHeight: 42,
        padding: "10px 16px",
        borderRadius: 12,
        fontWeight: 600,
        fontSize: "0.95rem",
        lineHeight: 1.2,
        cursor: props.disabled ? "not-allowed" : "pointer",
        transition:
          "background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}