'use client';

interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface TabToggleProps<T extends string> {
  options: TabOption<T>[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}

export function TabToggle<T extends string>({
  options,
  active,
  onChange,
  className = '',
}: TabToggleProps<T>) {
  return (
    <div
      className={`flex items-center bg-white  rounded-xl py-[3px] px-2 gap-1 self-start sm:self-auto shrink-0 h-[52px] ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`h-[42px] rounded-xl px-4 text-[14px] font-normal leading-[100%] text-[#212121] transition-all ${
            active === option.value ? 'bg-[#2196F380]' : 'hover:bg-light-gray/50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
