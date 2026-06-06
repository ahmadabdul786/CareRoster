'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/shared/typography';
import { Pagination } from '@/components/shared/pagination';
import { mockInvoices } from '@/constants/mockInvoices';
import {
  timesheetInvoiceStatusStyles,
  invoiceTableStatusBadgeStyles,
} from '@/constants/statusStyles';

const ITEMS_PER_PAGE_OPTIONS = [13, 20, 50];

export default function MyInvoicesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(13);

  const totalPages = Math.ceil(mockInvoices.length / itemsPerPage);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return mockInvoices.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-1">
            My Invoices
          </Typography>
          <Typography as="p" size="lg" weight="normal" className="text-secondary-gray">
            View and manage your generated invoices
          </Typography>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-soft-gray overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-light-gray">
                  <th className="px-6 py-4 text-left align-middle">
                    <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                      Invoice #
                    </Typography>
                  </th>
                  <th className="px-6 py-4 text-left align-middle">
                    <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                      Date
                    </Typography>
                  </th>
                  <th className="px-6 py-4 text-left align-middle">
                    <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                      Amount (AUD)
                    </Typography>
                  </th>
                  <th className="px-6 py-4 text-left align-middle">
                    <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                      Status
                    </Typography>
                  </th>
                  <th className="px-6 py-4 text-left align-middle">
                    <Typography as="span" size="md" weight="semibold" className="text-secondary-gray">
                      Action
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.map((invoice) => {
                  const statusStyle = timesheetInvoiceStatusStyles[invoice.status];
                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-light-gray last:border-b-0 bg-white hover:bg-light-gray/30 transition-colors"
                    >
                      <td className="px-6 py-4 align-middle">
                        <Typography as="span" size="md" weight="normal" className="text-dark-gray">
                          {invoice.invoiceNumber}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <Typography as="span" size="md" weight="normal" className="text-dark-gray">
                          {invoice.date}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <Typography as="span" size="md" weight="normal" className="text-dark-gray">
                          ${invoice.amount.toLocaleString()}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 align-middle text-left">
                        <span className={invoiceTableStatusBadgeStyles[invoice.status]}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <button
                          type="button"
                          onClick={() => router.push(`/dashboard-doctor/my-invoices/${invoice.id}`)}
                          className="text-light-blue text-md font-medium hover:underline transition-all"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
            showItemsPerPage
          />
        </div>
    </div>
  );
}
