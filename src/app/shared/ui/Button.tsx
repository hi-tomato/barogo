'use client';
import React from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { cn } from '../lib/cn';
import Loading from './Loading';

type Variant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'gradient'
  | 'ghost'
  | 'text'
  | 'tabButton'
  | 'kakao'
  | 'popularButton'
  | 'nearbyButton';
type Size = 'sm' | 'md' | 'lg' | 'icon' | 'pill';
type Icon = 'left' | 'right' | 'back' | 'forward' | React.ReactNode;
type IconPosition = 'left' | 'center' | 'right';
type ButtonType = 'button' | 'submit' | 'reset';
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (() => void) | ((e: React.FormEvent) => void);
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
  iconPosition?: IconPosition;
  className?: string;
  type?: ButtonType;
  text?: string;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary: 'bg-[#1C4E80] hover:bg-[#154066] text-white transition-colors',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white transition-colors',
  outline:
    'border border-[#1C4E80]/15 text-[#1C4E80] hover:bg-[#1C4E80]/5 hover:border-[#1C4E80]/30 transition-all',
  gradient:
    'bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-md transition-all',
  ghost: 'text-gray-600 hover:bg-gray-100 transition-colors',
  text: 'text-[#1C4E80] text-center transition-colors bg-transparent border-none',
  tabButton: 'bg-[#1C4E80] text-white transition-colors',
  kakao: 'bg-[#FEE500] hover:bg-[#FDD835] text-black transition-colors',
  popularButton: 'bg-[#1C4E80] hover:bg-[#154066] text-white transition-colors',
  nearbyButton:
    'bg-[#1C4E80] hover:bg-[#154066] text-white rounded-full transition-colors',
};

const buttonSizes = {
  sm: 'px-3 py-2 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
  icon: 'p-2 rounded-lg',
  pill: 'px-4 py-2 text-sm rounded-full',
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
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  text,
}: ButtonProps) {
  const baseClasses =
    variant === 'text'
      ? 'font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      : 'font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  const combinedClasses = cn(
    baseClasses,
    variantClasses,
    sizeClasses,
    {
      'w-full': fullWidth,
    },
    className
  );

  const renderIcon = () => {
    if (loading) {
      return <Loading />;
    }

    if (!icon) return null;

    if (typeof icon !== 'string') {
      return icon;
    }

    const IconComponent = iconComponents[icon as keyof typeof iconComponents];

    if (icon === 'back' && IconComponent) {
      return <IconComponent size={20} />;
    }

    if (icon === 'forward' && IconComponent) {
      return <IconComponent size={20} />;
    }

    return null;
  };

  const iconElement = renderIcon();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
    >
      {variant === 'text' ? (
        <>
          {iconPosition === 'left' && (
            <>
              {iconElement}
              <span className="mr-1" />
            </>
          )}
          {text || children}
          {iconPosition === 'right' && (
            <>
              <span className="ml-1" />
              {iconElement}
            </>
          )}
        </>
      ) : (
        <>
          {iconPosition === 'left' && iconElement}
          {iconPosition === 'center' ? (
            iconElement
          ) : (
            <span>{text || children}</span>
          )}
          {iconPosition === 'right' && iconElement}
        </>
      )}
    </button>
  );
}
