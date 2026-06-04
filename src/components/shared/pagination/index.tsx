'use client';

import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 20,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50],
  showItemsPerPage = true,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-12">
      {/* Left side - Page navigation */}
      <div className="flex items-center gap-2 h-12">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-6 h-6 bg-white flex items-center justify-center rounded-xl border border-soft-gray text-secondary-gray hover:text-dark-gray hover:border-dark-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <Icon icon="ph:caret-left" className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-6 h-6 flex items-center justify-center text-secondary-gray"
              >
                <Typography as="span" size="sm" weight="normal">
                  ...
                </Typography>
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                isActive
                  ? 'bg-light-blue text-white'
                  : 'text-dark-gray bg-white hover:text-dark-gray hover:bg-light-gray'
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Typography
                as="span"
                size="sm"
                weight={isActive ? 'medium' : 'normal'}
                className="leading-none"
              >
                {pageNumber.toString().padStart(2, '0')}
              </Typography>
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-6 h-6 bg-white flex  items-center justify-center rounded-xl border border-soft-gray text-secondary-gray hover:text-dark-gray hover:border-dark-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <Icon icon="ph:caret-right" className="w-4 h-4" />
        </button>
      </div>

      {/* Right side - Items per page selector */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none h-12 px-4 pr-10 border border-soft-gray rounded-2xl text-lg text-dark-gray cursor-pointer hover:border-dark-gray transition-colors bg-white"
            aria-label="Items per page"
          >
            {itemsPerPageOptions.map((option) => (
              <option className = "text-sm" key={option} value={option}>
               
                {option} items
                
              </option>
            ))}
          </select>
          <Icon
            icon="ph:caret-down"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-gray pointer-events-none"
          />
        </div>
      )}
    </div>
  );
}
