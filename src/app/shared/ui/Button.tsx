"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (() => void) | ((e: React.FormEvent) => void);
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: "left" | "right" | "back" | "forward";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-[#1C4E80] to-[#2563eb] text-white hover:shadow-lg hover:from-[#1C4E80]/90 hover:to-[#2563eb]/90",
  secondary:
    "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:shadow-lg hover:from-[#6366F1]/90 hover:to-[#8B5CF6]/90",
  outline:
    "border-2 border-[#1C4E80] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white",
  ghost: "text-[#1C4E80] hover:bg-[#1C4E80]/10",
  danger:
    "bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white hover:shadow-lg hover:from-[#DC2626]/90 hover:to-[#EF4444]/90",
};

const buttonSizes = {
  sm: "px-3 py-2 text-sm rounded-lg",
  md: "px-4 py-3 text-base rounded-xl",
  lg: "px-6 py-4 text-lg rounded-2xl",
};

const iconComponents = {
  left: null,
  right: null,
  back: HiArrowLeft,
  forward: HiArrowRight,
};

export default function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className = "",
  type = "button",
}: ButtonProps) {
  const IconComponent = icon ? iconComponents[icon] : null;

  const baseClasses =
    "font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  const widthClasses = fullWidth ? "w-full" : "";

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
    >
      {loading && (
        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
      )}

      {!loading && icon === "back" && IconComponent && (
        <IconComponent size={20} />
      )}

      <span>{children}</span>

      {!loading && icon === "forward" && IconComponent && (
        <IconComponent size={20} />
      )}
    </motion.button>
  );
}
