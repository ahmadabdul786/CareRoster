'use client';

import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  onChange?: (file: File | null) => void;
}

export function FileUpload({
  id,
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10,
  onChange,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Please upload a valid file type: ${accept}`);
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onChange?.(selectedFile);
    } else if (!selectedFile) {
      setFile(null);
      onChange?.(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError('');
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAcceptDisplay = () => {
    const types = accept.toUpperCase().replace(/\./g, '').split(',').join(' / ');
    return `(${types} • Max ${maxSize}MB)`;
  };

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={id}
        className="text-xs text-[14px] font-['Poppins',sans-serif] font-normal"
      >
        {label}
      </label>
      
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          backgroundImage: isDragging
            ? 'none'
            : file
            ? 'repeating-linear-gradient(0deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(90deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(180deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(270deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px)'
            : 'repeating-linear-gradient(0deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(90deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(180deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px), repeating-linear-gradient(270deg, #2196F3, #2196F3 10px, transparent 10px, transparent 15px)',
          backgroundSize: '2px 100%, 100% 2px, 2px 100%, 100% 2px',
          backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
          backgroundRepeat: 'no-repeat',
        }}
        className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[16px] bg-white transition-all ${
          isDragging ? 'bg-light-blue/5' : ''
        }`}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {!file ? (
          <>
            <Icon 
              icon="ph:cloud-arrow-up" 
              className="h-12 w-12 text-light-blue" 
            />
            <div className="text-center">
              <p className="text-base font-normal " style={{ fontFamily: 'poppins', lineHeight: '22px' }}>
                Click to upload or drag to upload any files
              </p>
              <p className="text-base font-normal text-primary-gray mt-1" style={{ fontFamily: 'Poppins', lineHeight: '20px' }}>
                {getAcceptDisplay()}
              </p>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Icon 
                icon="mdi:file-document-outline" 
                className="h-10 w-10 text-light-blue" 
              />
              <div className="flex flex-col">
                <p className="text-base text-dark-gray font-medium truncate max-w-[300px]">
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
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-lighter-soft-gray transition-colors"
            >
              <Icon icon="mdi:close" className="h-5 w-5 text-primary-gray" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red">{error}</p>
      )}
    </div>
  );
}
