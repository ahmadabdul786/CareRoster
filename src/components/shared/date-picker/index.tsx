'use client';

import * as React from 'react';

interface DatePickerProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  id,
  value = '',
  onChange,
  placeholder = 'Select date',
  className = '',
}: DatePickerProps) {
  return (
    <input
      id={id}
      type="date"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`h-7 w-[139px] px-2 py-1 border border-light-blue rounded-xl text-dark-gray leading-5 focus:outline-none  ${className}`}
      style={{ 
        fontFamily: 'Poppins', 
        fontWeight: 500, 
        fontSize: '14px', 
        lineHeight: '20px',
        
      }}
    />
  );
}
