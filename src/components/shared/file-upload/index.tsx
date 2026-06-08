'use client';

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onChange?: (file: File | null) => void;
  error?: string;
}

export function FileUpload({
  id,
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10,
  onChange,
  error: externalError,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File): boolean => {
    if (f.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!accept.split(',').map(t => t.trim()).includes(ext)) {
      setError(`Please upload a valid file type: ${accept}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleFileChange = (selected: File | null) => {
    if (selected && validateFile(selected)) {
      setFile(selected);
      onChange?.(selected);
    } else if (!selected) {
      setFile(null);
      onChange?.(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files[0] ?? null);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError('');
    onChange?.(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const acceptDisplay = `(${accept.toUpperCase().replace(/\./g, '').split(',').join(' / ')} • Max ${maxSize}MB)`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-md font-normal">
        {label}
      </label>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
        onDrop={handleDrop}
        className={`relative flex h-[184px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl bg-white transition-colors ${
          isDragging ? 'bg-ultra-light-blue' : ''
        }`}
      >
        {/* SVG dashed border — follows rounded corners perfectly */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="15"
            ry="15"
            fill="none"
            stroke={isDragging ? '#90CAF9' : '#2196F3'}
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="square"
          />
        </svg>

        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />

        {!file ? (
          <>
            <Icon icon="ph:cloud-arrow-up" className="h-12 w-12 text-light-blue" />
            <div className="text-center">
              <p className="text-lg font-normal leading-snug">
                Click to upload or drag to upload any files
              </p>
              <p className="mt-1 text-lg font-normal leading-snug text-primary-gray">
                {acceptDisplay}
              </p>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Icon icon="mdi:file-document-outline" className="h-10 w-10 text-light-blue" />
              <div className="flex flex-col">
                <p className="max-w-[300px] truncate text-base font-medium text-dark-gray">
                  {file.name}
                </p>
                <p className="text-sm text-primary-gray">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-lighter-soft-gray"
            >
              <Icon icon="mdi:close" className="h-5 w-5 text-primary-gray" />
            </button>
          </div>
        )}
      </div>

      {(error || externalError) && (
        <p className="text-sm text-red-500">{error || externalError}</p>
      )}
    </div>
  );
}
