"use client";

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | (() => Promise<void>);
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  children,
  type,
  disabled,
  onClick,
  icon,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {icon && icon}
      {children}
    </button>
  );
}
