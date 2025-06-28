"use client";

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | (() => Promise<void>);
  icon?: React.ReactNode;
  className?: string;
  text?: string;
}

export default function Button({
  children,
  type,
  disabled,
  onClick,
  icon,
  className,
  text,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon && icon}
      {text && text}
      {children}
    </button>
  );
}
