"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "gradient" | "glass" | "elevated";
  size?: "sm" | "md" | "lg";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  animate?: boolean;
}

const cardVariants = {
  default: "bg-white border border-gray-200",
  gradient: "bg-gradient-to-br from-white to-[#F8FAFC] border border-white/80",
  glass: "bg-white/80 backdrop-blur-sm border border-white/60",
  elevated: "bg-white shadow-lg border border-gray-100",
};

const cardSizes = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

const cardPadding = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  variant = "default",
  size = "md",
  padding = "md",
  className = "",
  onClick,
  hover = false,
  animate = true,
}: CardProps) {
  const baseClasses = "transition-all duration-200";
  const variantClasses = cardVariants[variant];
  const sizeClasses = cardSizes[size];
  const paddingClasses = cardPadding[padding];
  const hoverClasses = hover
    ? "hover:shadow-md hover:scale-[1.02] cursor-pointer"
    : "";
  const clickClasses = onClick ? "cursor-pointer" : "";

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${paddingClasses} ${hoverClasses} ${clickClasses} ${className}`;

  const CardComponent = animate ? motion.div : "div";

  return (
    <CardComponent
      className={combinedClasses}
      onClick={onClick}
      whileHover={animate && hover ? { y: -2 } : undefined}
      whileTap={animate && onClick ? { scale: 0.98 } : undefined}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.3 } : undefined}
    >
      {children}
    </CardComponent>
  );
}
