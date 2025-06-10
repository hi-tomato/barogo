"use client";

interface ButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  text,
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
      {text}
    </button>
  );
}
