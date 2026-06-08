'use client';

import type { ReactNode } from 'react';
import { Typography } from '@/components/shared/typography';
import type {
  InvoiceLineItem,
  InvoicePaymentColumn,
  InvoicePaymentColumnId,
  InvoicePaymentSummaryTableProps,
} from './types';

export type { InvoiceLineItem, InvoicePaymentSummaryTableProps } from './types';

const DEFAULT_COLUMNS: InvoicePaymentColumn[] = [
  { id: 'description', label: 'Description', width: '52%' },
  { id: 'hours', label: 'Hours', width: '16%' },
  { id: 'rate', label: 'Rate', width: '16%' },
  { id: 'amount', label: 'Amount', width: '16%' },
];

function formatCellValue(columnId: InvoicePaymentColumnId, item: InvoiceLineItem): ReactNode {
  switch (columnId) {
    case 'description':
      return (
        <>
          <Typography as="p" size="h3" weight="semibold" className="text-[#212121] leading-[30px]">
            {item.title}
          </Typography>
          {item.subtitle && (
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray mt-0.5">
              {item.subtitle}
            </Typography>
          )}
        </>
      );
    case 'hours':
      return (
        <Typography as="p" size="md" weight="normal" className="text-[#757575] tracking-[-0.08px]">
          {item.hours.toFixed(2)} Hrs
        </Typography>
      );
    case 'rate':
      return (
        <Typography as="p" size="md" weight="normal" className="text-[#757575] tracking-[-0.08px]">
          ${item.rate.toFixed(2)}
        </Typography>
      );
    case 'amount':
      return (
        <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray">
          ${item.amount.toFixed(2)}
        </Typography>
      );
  }
}

export function InvoicePaymentSummaryTable({
  lineItems,
  subtotal,
  gstPercent,
  gst,
  total,
  columns = DEFAULT_COLUMNS,
}: InvoicePaymentSummaryTableProps) {
  return (
    <table className="w-full">
      <colgroup>
        {columns.map((col) => (
          <col key={col.id} style={{ width: col.width }} />
        ))}
      </colgroup>
      <thead>
        <tr className=" border-b border-light-gray">
          {columns.map((col, i) => (
            <th key={col.id} className={`py-6 ${i === 0 ? 'text-left' : 'text-right'}`}>
              <Typography as="span" size="md" weight="normal" className="font-normal text-[#9E9E9E] tracking-[-0.08px]">
                {col.label}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lineItems.map((item, index) => (
          <tr key={index} className="border-b border-light-gray">
            {columns.map((col, i) => (
              <td
                key={col.id}
                className={`pt-6 pb-8 ${i === 0 ? 'pr-4' : 'text-right align-middle'}`}
              >
                {formatCellValue(col.id, item)}
              </td>
            ))}
          </tr>
        ))}

        <tr>
          <td />
          <td className="pt-8 pb-1 text-right">
            <Typography as="p" size="lg" weight="semibold" className="text-[#757575] tracking-[-0.08px]">
              Subtotal
            </Typography>
          </td>
          <td />
          <td className="pt-8 pb-1 text-right">
            <Typography as="p" size="md" weight="normal" className="text-[#757575] tracking-[-0.08px]">
              ${subtotal.toFixed(2)}
            </Typography>
          </td>
        </tr>

        <tr>
          <td />
          <td className="py-1 text-right">
            <Typography as="p" size="lg" weight="semibold" className="text-[#757575] tracking-[-0.08px]">
              GST({gstPercent}%)
            </Typography>
          </td>
          <td />
          <td className="py-1 text-right">
            <Typography as="p" size="md" weight="normal" className="text-[#757575] tracking-[-0.08px]">
              ${gst.toFixed(2)}
            </Typography>
          </td>
        </tr>

        <tr>
          <td />
          <td className="py-2  text-right">
            <Typography as="p" size="h3" weight="semibold" className="text-[#212121] leading-[30px]">
              Total Amount
            </Typography>
          </td>
          <td />
          <td className="py-2 pt-8 text-right">
            <Typography as="p" size="h1" weight="semibold" className="text-light-blue leading-[35px]">
              ${total.toFixed(2)}
            </Typography>
            <Typography as="p" size="md" weight="normal" className="text-[#9E9E9E] tracking-widest">
              AUD DOLLARS
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
