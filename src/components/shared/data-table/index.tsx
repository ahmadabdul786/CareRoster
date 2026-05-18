'use client';

import Image from 'next/image';
import React, { FC, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

import type { DataTableProps } from '@/types';
import { Typography } from '../typography';

const DataTable: FC<DataTableProps> = ({
    invoice,
    headerColor = 'bg-primary-dark',
    notFonudText,
    paginate = false,
    loading = false,
    tableRows = [],
    rowsPerPage = 5,
    ColumnsData = [],
    TableBodyRow,
    roundedHeader = false,
    headerClassName = '',
    headerPosition,
    meta = { totalItems: 0, itemsPerPage: 5, currentPage: 1, totalPages: 1 },
    setCurrentPage,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const isTableEmpty = useMemo(() => tableRows.length === 0 && !loading, [tableRows, loading]);

    const handleSort = (columnId: string, isSortable: boolean) => {
        if (!isSortable) return;

        setSortConfig((prev) => {
            if (prev?.key === columnId) {
                return { key: columnId, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key: columnId, direction: 'asc' };
        });
    };

    const sortedRows = useMemo(() => {
        if (!sortConfig) return tableRows;

        return [...tableRows].sort((a, b) => {
            const aValue = a[sortConfig.key] as string | number;
            const bValue = b[sortConfig.key] as string | number;

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tableRows, sortConfig]);

    useEffect(() => {
        const handleClickOutside = () => setDropdownOpen(false);
        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [dropdownOpen]);

    const handlePageChange = (newPage: { selected: number }) => {
        if (setCurrentPage) {
            setCurrentPage(newPage.selected + 1);
        }
    };

    return (
        <div className="w-full flex flex-col">
            {/* Table with horizontal scrolling */}
            <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-full">
                    <table className="w-full table-auto">
                        <thead
                            className={`${roundedHeader ? 'rounded-lg' : ''} ${headerPosition} ${headerColor ? headerColor : 'bg-white'} ${headerColor === 'bg-primary-dark' ? 'text-white' : 'text-black'}`}
                        >
                            <tr>
                                {ColumnsData.map((column, index) => (
                                    <th
                                        key={index}
                                        onClick={() => column.sortable && handleSort(column.id, column.sortable ?? false)}
                                        className={`px-4 lg:px-6 py-4 font-bold whitespace-nowrap tracking-wider ${column?.id === 'action' ? 'opacity-0' : ''
                                            } text-md font-semibold ${roundedHeader && index === 0 ? 'rounded-l-lg' : ''} ${roundedHeader && index === ColumnsData.length - 1 ? 'rounded-r-lg' : ''
                                            } ${headerClassName} ${column.sortable ? 'cursor-pointer select-none' : ''} ${invoice ? (index === 0 ? 'text-start' : 'text-center') : 'text-left'
                                            }`}
                                    >
                                        <div
                                            className={`flex items-center ${invoice ? (index === 0 ? 'justify-start' : 'justify-center') : ''}`}
                                        >
                                            {column.label}
                                            {column.sortable && (
                                                <div className="flex flex-col justify-center gap-0 items-center ml-1">
                                                    <ChevronUp size={10} />
                                                    <ChevronDown size={10} />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="min-h-[800px]">
                            {!loading && sortedRows.map((row, idx) => (
                                <TableBodyRow key={(row._id as string) || (row.id as string)} {...row} idx={idx} />
                            ))}
                            {loading &&
                                [...Array(rowsPerPage)].map((_, idx) => (
                                    <tr key={idx}>
                                        {[...Array(ColumnsData.length)].map((_, index) => (
                                            <td key={index} className="px-4 py-7 text-dark-charcoal text-md">
                                                <div className="w-full h-4 bg-light-gray rounded animate-pulse"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>

                        {isTableEmpty && (
                            <tbody>
                                <tr>
                                    <td colSpan={ColumnsData.length}>
                                        <div className="h-[400px] w-full flex flex-col items-center justify-center gap-3">
                                            <Image src="/assets/svgs/no-data.svg" alt="no-data" width={85} height={85} />
                                            <Typography size="lg" className="font-bold text-dark-gray">
                                                {notFonudText ? notFonudText : 'No data found'}
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>

            {/* Pagination - Outside of the scrollable container */}
            {paginate && !loading && tableRows.length > 0 && (
                <div className="w-full flex flex-col md:flex-row justify-end gap-4 md:gap-5 items-end md:items-center p-6 border-t border-gray-200 mt-4">
                    <div>
                        <Typography size="sm" className="text-dark-charcoal">
                            Result {(meta.currentPage - 1) * meta.itemsPerPage + 1} -{' '}
                            {Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)} of {meta.totalItems}
                        </Typography>
                    </div>
                    <div className="flex justify-center items-center">
                        <ReactPaginate
                            pageCount={meta.totalPages}
                            breakLabel="..."
                            onPageChange={handlePageChange}
                            forcePage={meta.currentPage - 1}
                            pageRangeDisplayed={12}
                            marginPagesDisplayed={1}
                            previousLabel={
                                <span className="text-gray cursor-pointer flex items-center">
                                    <ChevronLeft size={18} />
                                </span>
                            }
                            nextLabel={
                                <span className="text-gray cursor-pointer flex items-center">
                                    <ChevronRight size={18} />
                                </span>
                            }
                            containerClassName="flex justify-center items-center gap-2"
                            pageClassName="w-8 h-8 flex justify-center items-center text-dark-gray rounded-full cursor-pointer"
                            activeClassName="border-2 border-primary-light text-primary-light"
                            breakClassName="w-8 h-8 flex justify-center items-center"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(DataTable);
