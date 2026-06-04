'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [internalValue, setInternalValue] = useState('');
  const selectedValue = value !== undefined ? value : internalValue;
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const isCustomValue = selectedValue && !options.find((opt) => opt.value === selectedValue);

  const updateMenuPosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
      setShowCustomInput(false);
      setCustomInput('');
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showCustomInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [showCustomInput]);

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();

    window.addEventListener('scroll', updateMenuPosition, true);
    window.addEventListener('resize', updateMenuPosition);

    return () => {
      window.removeEventListener('scroll', updateMenuPosition, true);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [isOpen, updateMenuPosition]);

  const handleSelect = (optionValue: string) => {
    if (allowCustomInput && optionValue === 'other') {
      setShowCustomInput(true);
      setCustomInput('');
    } else {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      setIsOpen(false);
      setShowCustomInput(false);
      onChange?.(optionValue);
    }
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim()) {
      e.preventDefault();
      const nextValue = customInput.trim();
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
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

  const menuContent = isOpen ? (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 9999,
      }}
      className="rounded-[12px] border border-soft-gray bg-white shadow-lg max-h-[200px] overflow-y-auto"
    >
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
  ) : null;

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      {label ? (
        <Typography as="label" size="sm" className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal">
          {label}
          {required && '*'}
        </Typography>
      ) : null}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          onClick={() => {
            if (disabled) return;
            if (!isOpen) updateMenuPosition();
            setIsOpen(!isOpen);
          }}
          disabled={disabled}
          className={`flex h-[48px] w-full items-center justify-between rounded-[16px] border bg-white px-3 text-base outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? 'border-alert-red'
              : 'border-primary-gray focus:border-light-blue'
          }`}
        >
          <span className={selectedOption || isCustomValue ? 'text-dark-gray' : 'text-primary-gray'}>
            {getDisplayValue()}
          </span>
          <Icon
            icon="mdi:chevron-down"
            className={`h-4 w-4 text-dark-gray transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {typeof document !== 'undefined' && menuContent
          ? createPortal(menuContent, document.body)
          : null}
      </div>
      {error && <span className="text-xs sm:text-sm text-red-500">{error}</span>}
    </div>
  );
}
