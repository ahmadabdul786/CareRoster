'use client';

import { Icon } from '@iconify/react';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface PasswordInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative flex flex-col gap-1">
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
            type={showPassword ? 'text' : 'password'}
            className={`w-full h-[42px] sm:h-[46px] lg:h-[48px] px-3 sm:px-4 py-3 sm:py-[14px] border border-soft-gray rounded-[16px] pr-10 sm:pr-12 text-base outline-none focus:border-light-blue transition-colors ${className}`}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              lineHeight: '1.25',
              letterSpacing: '0px'
            }}
            {...props}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute cursor-pointer right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2196F3] hover:text-[#1976D2] transition-colors p-1"
          >
            {showPassword ? <Icon icon="iconoir:eye" width="24" height="24" /> : <Icon icon="codicon:eye-closed" width="24" height="24" />}
          </button>
        </div>
        {error && (
          <span className="absolute top-full left-0 mt-0.5 text-[10px] text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

PasswordInputField.displayName = 'PasswordInputField';

