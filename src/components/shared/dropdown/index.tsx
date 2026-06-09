'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  id: string;
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  allowCustomInput?: boolean;
  disabled?: boolean;
  error?: string;
}

export function Dropdown({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  required = false,
  allowCustomInput = false,
  disabled = false,
  error,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const isCustomValue = selectedValue && !options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowCustomInput(false);
        setCustomInput('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  const handleSelect = (optionValue: string) => {
    if (allowCustomInput && optionValue === 'other') {
      setShowCustomInput(true);
      setCustomInput('');
    } else {
      setSelectedValue(optionValue);
      setIsOpen(false);
      setShowCustomInput(false);
      onChange?.(optionValue);
    }
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim()) {
      e.preventDefault();
      setSelectedValue(customInput.trim());
      onChange?.(customInput.trim());
      setIsOpen(false);
      setShowCustomInput(false);
      setCustomInput('');
    }
  };

  const getDisplayValue = () => {
    if (isCustomValue) {
      return selectedValue;
    }
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      <Typography as="label"  size="sm" className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal">
        {label}
        {required && '*'}
      </Typography>
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="flex h-[48px] w-full items-center justify-between rounded-[16px] border border-primary-gray bg-white px-4 text-base outline-none focus:border-light-blue transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <span className={selectedOption || isCustomValue ? 'text-dark-gray' : 'text-primary-gray'}>
            {getDisplayValue()}
          </span>
          <Icon
            icon="mdi:chevron-down"
            className={`h-4 w-4 text-dark-gray transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-[12px] border border-soft-gray bg-white shadow-lg max-h-[200px] overflow-y-auto">
            {!showCustomInput ? (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 text-left text-base hover:bg-lighter-soft-gray transition-colors ${
                    selectedValue === option.value
                      ? 'bg-lighter-soft-gray text-light-blue font-medium'
                      : 'text-dark-gray'
                  }`}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="p-3">
                <input
                  ref={customInputRef}
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={handleCustomInputKeyDown}
                  placeholder="Type and press Enter"
                  className="w-full px-3 py-2 text-base border border-soft-gray rounded-[8px] outline-none focus:border-light-blue"
                />
                <Typography as="p" size="sm" className="text-primary-gray mt-2">
                  Press Enter to confirm
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs sm:text-sm text-red-500">{error}</span>}
    </div>
  );
}
