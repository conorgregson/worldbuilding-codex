import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, style, ...props }: Props) {
  return (
    <input
      {...props}
      className={["ui-input", className].filter(Boolean).join(" ")}
      style={{
        width: "100%",
        minHeight: 46,
        boxSizing: "border-box",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        background: "var(--color-input-bg)",
        color: "var(--color-text-strong)",
        fontSize: "0.95rem",
        transition:
          "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
        ...style,
      }}
    />
  );
}