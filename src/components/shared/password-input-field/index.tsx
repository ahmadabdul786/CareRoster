'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

interface PasswordInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label 
            htmlFor={props.id}
            className="text-xs sm:text-sm lg:text-[14px]"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              lineHeight: '1.4',
              letterSpacing: '0px',
              color: '#212121'
            }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={`w-full h-[42px] sm:h-[46px] lg:h-[48px] px-3 sm:px-4 py-3 sm:py-[14px] border border-[#E0E0E0] rounded-[8px] pr-10 sm:pr-12 text-sm sm:text-base ${className}`}
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
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2196F3] hover:text-[#1976D2] transition-colors p-1"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {error && (
          <span className="text-xs sm:text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

PasswordInputField.displayName = 'PasswordInputField';

/* ── Inline SVG icons ── */

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
