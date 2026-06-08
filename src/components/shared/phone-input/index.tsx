'use client';

import { useState, useMemo } from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import Select, { SingleValue, StylesConfig, components, SingleValueProps, OptionProps } from 'react-select';
import * as flags from 'country-flag-icons/react/3x2';
import * as countryListJs from 'country-list-js';

// Type definition for country-list-js
interface CountryListJS {
  names: () => string[];
  findByName: (name: string) => {
    name: string;
    code: { iso2: string; iso3: string };
    dialing_code: string;
    capital: string;
    continent: string;
  };
}

const country = countryListJs as unknown as CountryListJS;

interface CountryOption {
  label: string;
  value: string;
  dialCode: string;
}

interface PhoneInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export function PhoneInput({
  id,
  label,
  placeholder = 'Enter you Phone Number',
  value = '',
  onChange,
  required = false,
  disabled = false,
  error,
}: PhoneInputProps) {
  // Get all countries with their dialing codes from country-list-js
  const countries = useMemo(() => {
    const countryNames = country.names();
    return countryNames.map((name: string) => {
      const countryData = country.findByName(name);
      return {
        label: name,
        value: countryData.code.iso2,
        dialCode: countryData.dialing_code,
      };
    });
  }, []);
  
  const defaultCountry = useMemo(
    () => countries.find((c: CountryOption) => c.value === 'AU') ?? countries[0] ?? null,
    [countries]
  );
  const [selectedCountry, setSelectedCountry] = useState<SingleValue<CountryOption>>(null);
  const isMounted = useIsClient();
  const activeCountry = selectedCountry ?? defaultCountry;

  // Compute placeholder based on selected country
  const dynamicPlaceholder = useMemo(() => {
    if (activeCountry?.dialCode) {
      return `${activeCountry.dialCode} 412 345 678`;
    }
    return placeholder;
  }, [activeCountry, placeholder]);

  const handleCountryChange = (option: SingleValue<CountryOption>) => {
    setSelectedCountry(option);
  };

  // Custom component to show only flag in selected value
  const CustomSingleValue = ({ ...props }: SingleValueProps<CountryOption>) => {
    const code = props.data.value.toUpperCase();
    const FlagComponent = (flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[code];
    
    return (
      <components.SingleValue {...props}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {FlagComponent && <FlagComponent style={{ width: '28px', height: '20px', borderRadius: '2px' }} />}
          {!FlagComponent && <span style={{ fontSize: '20px' }}>{props.data.value}</span>}
        </div>
      </components.SingleValue>
    );
  };

  // Custom component to show only flag in dropdown
  const CustomOption = (props: OptionProps<CountryOption>) => {
    const code = props.data.value.toUpperCase();
    const FlagComponent = (flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[code];
    
    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {FlagComponent && <FlagComponent style={{ width: '28px', height: '20px', borderRadius: '2px' }} />}
          {!FlagComponent && <span style={{ fontSize: '20px' }}>{props.data.value}</span>}
        </div>
      </components.Option>
    );
  };

  const errorBorderColor = '#FF3B3B';
  const defaultBorderColor = '#9E9E9E';
  const focusBorderColor = '#2196F3';

  const customStyles: StylesConfig<CountryOption, false> = {
    control: (provided, state) => {
      const borderColor = error
        ? errorBorderColor
        : state.isFocused
          ? focusBorderColor
          : defaultBorderColor;

      return {
        ...provided,
        minHeight: '48px',
        height: '48px',
        borderColor,
        borderRadius: '16px 0 0 16px',
        borderRight: `1px solid ${borderColor}`,
        boxShadow: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
        '&:hover': {
          borderColor,
        },
      };
    },
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 2px 0 12px',
      height: '48px',
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      margin: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '16px',
      color: 'var(--primary-gray)',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      marginTop: '4px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 20,
      maxHeight: '240px',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '240px',
      padding: '4px 0',
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      backgroundColor: state.isSelected
        ? '#ECECEC'
        : state.isFocused
        ? '#ECECEC'
        : 'white',
      color: state.isSelected ? '#2196F3' : '#212121',
      fontWeight: state.isSelected ? 500 : 400,
      padding: '10px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:active': {
        backgroundColor: '#ECECEC',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'transparent',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#212121',
      padding: '0 6px 0 2px',
      width: '20px',
      height: '20px',
      transition: 'transform 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      '&:hover': {
        color: '#212121',
      },
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      <label 
        htmlFor={id}
        className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal"
      >
        {label}
        {required && '*'}
      </label>
      <div className="flex items-center">
        <div className="w-[70px]">
          {isMounted ? (
            <Select
              options={countries}
              value={activeCountry}
              onChange={handleCountryChange}
              styles={customStyles}
              isSearchable
              placeholder="🌍"
              components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
              isDisabled={disabled}
            />
          ) : (
            <div
              style={{
                minHeight: '48px',
                height: '48px',
                borderRadius: '16px 0 0 16px',
                border: `1px solid ${error ? errorBorderColor : defaultBorderColor}`,
                backgroundColor: 'white',
              }}
            />
          )}
        </div>
        <input
          key={activeCountry?.value || 'default'}
          id={id}
          type="tel"
          placeholder={dynamicPlaceholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={`flex-1 h-[48px] px-3 text-base text-dark-gray outline-none placeholder:text-primary-gray border border-l-0 rounded-r-[16px] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? 'border-alert-red'
              : 'border-primary-gray focus:border-light-blue'
          }`}
        />
      </div>
      {error && <span className="text-xs sm:text-sm text-red-500">{error}</span>}
    </div>
  );
}
