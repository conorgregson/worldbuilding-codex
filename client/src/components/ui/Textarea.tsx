import type { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, style, rows = 5, ...props }: Props) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={["ui-textarea", className].filter(Boolean).join(" ")}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        background: "var(--color-input-bg)",
        color: "var(--color-text-strong)",
        fontSize: "0.95rem",
        resize: "vertical",
        transition:
          "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
        ...style,
      }}
    />
  );
}