'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Typography } from '@/components/shared/typography';
import { InvoicePaymentSummaryTable } from '@/components/ui/invoice-payment-summary-table';
import type { Invoice } from '@/constants/mockInvoices';

interface InvoiceDocumentProps {
  invoice: Invoice;
}

function computeTotals(invoice: Invoice) {
  const subtotal = invoice.amount;
  const gst = Math.round(subtotal * (invoice.gstPercent / 100) * 100) / 100;
  const total = subtotal + gst;
  return { subtotal, gst, total };
}

export const InvoiceDocument = forwardRef<HTMLDivElement, InvoiceDocumentProps>(
  function InvoiceDocument({ invoice }, ref) {
    const { subtotal, gst, total } = computeTotals(invoice);

    const shiftDetails = [
      { label: 'Shift Date', value: invoice.shiftDate },
      { label: 'Total Hours', value: `${invoice.totalHours} hrs` },
      { label: 'Hourly Rate', value: `$${invoice.hourlyRate} AUD` },
    ];

    return (
      <div ref={ref} id="invoice-print-area" className="flex flex-col min-h-[1307px]">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Image src="/assets/svg/logo.svg" alt="Locum Hero" width={140} height={40} className="object-contain" />
            <Typography as="p" size="md" weight="normal" className="text-primary-gray tracking-[3.9] leading-5 mt-3 uppercase">
              Professional Invoicing System
            </Typography>
          </div>
          <div className="text-right">
            <span className="text-soft-gray text-[48px] font-bold tracking-[3px]">INVOICE</span>
            <Typography as="p" size="lg" weight="semibold" className="text-dark-gray mt-1 leading-5">
              Invoice Number: <span className="font-medium">{invoice.invoiceNumber}</span>
            </Typography>
            <Typography as="p" size="lg" weight="semibold" className="text-dark-gray leading-5">
              Invoice Date: <span className="font-medium">{invoice.date}</span>
            </Typography>
          </div>
        </div>

        <div className="my-4 w-full h-[6px]" style={{ background: 'linear-gradient(to right, #4FC3F7 50%, #005DA6 50%)' }} />

        <div className="flex gap-6 mt-6">
          <div className="flex-1">
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray tracking-[1.5px] uppercase mb-1.5">
              From
            </Typography>
            <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray">
              {invoice.doctorName}
            </Typography>
            <Typography as="p" size="lg" weight="semibold" className="text-secondary-gray mt-0.5">
              ABN:<span className="font-normal text-md">{invoice.doctorAbn}</span>
            </Typography>
          </div>

          <div className="w-px bg-soft-gray self-stretch" />

          <div className="flex-1">
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray tracking-[1.5px] uppercase mb-1.5">
              To
            </Typography>
            <Typography as="h3" size="h3" weight="semibold" className="text-dark-gray">
              {invoice.hospitalName}
            </Typography>
            <Typography as="p" size="lg" weight="semibold" className="text-secondary-gray mt-0.5">
              ABN:<span className="font-normal text-md">{invoice.hospitalAbn}</span>
            </Typography>
          </div>

          <div className="w-px bg-soft-gray self-stretch" />

          <div className="flex-1">
            <Typography as="p" size="md" weight="normal" className="text-secondary-gray tracking-[1.5px] uppercase mb-1.5">
              Shift Details
            </Typography>
            <div className="space-y-0.5">
              {shiftDetails.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                  <Typography as="span" size="lg" weight="semibold" className="text-secondary-gray shrink-0">
                    {label}:
                  </Typography>
                  <Typography as="span" size="md" weight="normal" className="text-secondary-gray">
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Typography as="h2" size="h1" weight="semibold" className="text-[#212121] mt-10 mb-4 leading-[35px]">
          Payment Summary
        </Typography>

        <InvoicePaymentSummaryTable
          lineItems={[
            {
              title: invoice.shiftTitle,
              subtitle: 'Emergency Shift – Day Coverage',
              hours: invoice.totalHours,
              rate: invoice.hourlyRate,
              amount: subtotal,
            },
          ]}
          subtotal={subtotal}
          gstPercent={invoice.gstPercent}
          gst={gst}
          total={total}
        />

        <div className="mt-auto mb-4 w-full h-[6px]" style={{ background: 'linear-gradient(to right, #005DA6 50%, #4FC3F7 50%)' }} />
        <div>
          <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
            Note: This invoice is generated by Locum Hero based on submitted timesheet data. No tax or additional charges are included.
          </Typography>
        </div>
      </div>
    );
  }
);
