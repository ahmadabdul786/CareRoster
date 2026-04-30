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
            className={`w-full h-[42px] sm:h-[46px] lg:h-[48px] px-3 sm:px-4 py-3 sm:py-[14px] border border-[#E0E0E0] rounded-[8px] text-sm sm:text-base ${
              rightIcon ? 'pr-10 sm:pr-12' : ''
            } ${className}`}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              lineHeight: '1.25',
              letterSpacing: '0px'
            }}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs sm:text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

TextInputField.displayName = 'TextInputField';
