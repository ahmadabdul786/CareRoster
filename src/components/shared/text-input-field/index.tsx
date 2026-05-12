'use client'
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface TextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
}

export const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  ({ label, error, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label 
            htmlFor={props.id}
            className="text-[14px] text-dark-gray font-['Poppins', sans-serif] font-normal"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full h-[42px] sm:h-[46px] lg:h-[48px] px-3 sm:px-4 py-3 sm:py-[14px] border border-[#E0E0E0] rounded-[16px] text-base font-['Poppins',sans-serif] focus:outline-none focus:border-light-blue transition-all ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs sm:text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

TextInputField.displayName = 'TextInputField';
