'use client';

import { useEffect, useMemo, useState } from 'react';
import Select, { type SingleValue, type StylesConfig } from 'react-select';
import { Icon } from '@iconify/react';
import { CITY_SUBURB_OPTIONS } from '@/constants/citySuburbs';

type CityOption = { value: string; label: string };

interface CitySuburbSearchProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const options: CityOption[] = [...CITY_SUBURB_OPTIONS];

const selectStyles: StylesConfig<CityOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    height: 48,
    borderRadius: 16,
    borderColor: state.isFocused ? '#2196F3' : '#E0E0E0',
    boxShadow: 'none',
    paddingRight: 32,
    fontSize: 16,
    '&:hover': {
      borderColor: state.isFocused ? '#2196F3' : '#E0E0E0',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 16px',
    height: 48,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9E9E9E',
    fontSize: 16,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#212121',
    fontSize: 16,
  }),
  input: (base) => ({
    ...base,
    color: '#212121',
    fontSize: 16,
    margin: 0,
    padding: 0,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    marginTop: 4,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 200,
    padding: '4px 0',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 16,
    padding: '12px 16px',
    backgroundColor: state.isFocused ? '#F5F5F5' : 'white',
    color: state.isSelected ? '#2196F3' : '#212121',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: () => ({ display: 'none' }),
  clearIndicator: (base) => ({
    ...base,
    padding: '0 4px',
    color: '#9E9E9E',
  }),
};

export function CitySuburbSearch({ id, value = '', onChange }: CitySuburbSearchProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value || opt.label === value) ?? null,
    [value]
  );

  const handleChange = (option: SingleValue<CityOption>) => {
    onChange?.(option?.value ?? '');
  };

  if (!isMounted) {
    return (
      <div className="relative">
        <div className="h-12 w-full rounded-2xl border border-soft-gray bg-white" />
        <Icon
          icon="ph:magnifying-glass"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-gray pointer-events-none"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Select<CityOption, false>
        inputId={id}
        instanceId={id ?? 'city-suburb-search'}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Search"
        isClearable
        isSearchable
        menuPortalTarget={document.body}
        menuPosition="fixed"
        styles={selectStyles}
        noOptionsMessage={() => 'No suburbs found'}
      />
      <Icon
        icon="ph:magnifying-glass"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-gray pointer-events-none z-10"
      />
    </div>
  );
}
