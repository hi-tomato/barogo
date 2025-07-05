'use client';
import React, { forwardRef } from 'react';
import { cn } from '@/app/shared/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled' | 'search';
  fullWidth?: boolean;
  required?: boolean;
}

const inputVariants = {
  default: 'border-gray-200 focus:border-[#1C4E80] focus:ring-[#1C4E80]',
  outline:
    'border-2 border-gray-300 focus:border-[#1C4E80] focus:ring-[#1C4E80]/20',
  filled:
    'border-gray-200 bg-gray-50 focus:bg-white focus:border-[#1C4E80] focus:ring-[#1C4E80]',
  search:
    'bg-gray-100 rounded-full border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      fullWidth = true,
      required = false,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputClasses = cn(
      // 기본 스타일 (variant에 따라 다름)
      variant === 'search'
        ? 'w-full px-4 py-3 font-suit placeholder:text-gray-500 focus:outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'
        : 'w-full rounded-lg border px-4 py-3 font-suit placeholder:text-[#8A8A8A] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
      // variant 스타일
      inputVariants[variant],
      // 조건부 스타일
      {
        'border-red-500 focus:border-red-500 focus:ring-red-500':
          error && variant !== 'search',
        'pl-10': leftIcon,
        'pr-10': rightIcon,
      },
      className // 외부에서 주입하는 스타일
    );

    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-suit block text-sm font-medium text-[#2B2B2B]"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute top-1/2 left-3 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-xs">
            {error ? (
              <p
                id={`${inputId}-error`}
                className="font-suit text-red-500"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            ) : (
              <p id={`${inputId}-helper`} className="font-suit text-gray-500">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
