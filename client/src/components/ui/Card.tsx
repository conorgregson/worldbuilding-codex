import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, style, ...props }: Props) {
  return (
    <div
      {...props}
      className={["ui-card", className].filter(Boolean).join(" ")}
      style={{
        background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-2) 100%)",
        border: "1px solid var(--color-border)",
        borderRadius: 18,
        padding: "24px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.24)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}