'use client';

import { useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Button } from '@/components/shared/button';
import { InvoiceDocument } from '@/components/ui/invoice-document';
import { mockInvoices } from '@/constants/mockInvoices';

function computeTotals(amount: number, gstPercent: number) {
  const subtotal = amount;
  const gst = Math.round(subtotal * (gstPercent / 100) * 100) / 100;
  return subtotal + gst;
}

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const printRef = useRef<HTMLDivElement>(null);

  const invoice = mockInvoices.find((inv) => inv.id === Number(id));
  if (!invoice) return notFound();

  const total = computeTotals(invoice.amount, invoice.gstPercent);

  const handleDownloadPdf = () => {
    const style = document.createElement('style');
    style.id = '__invoice-print-style';
    style.innerHTML = `
      @media print {
        body * { visibility: hidden !important; }
        #invoice-print-area, #invoice-print-area * { visibility: visible !important; }
        #invoice-print-area {
          position: fixed !important;
          inset: 0 !important;
          padding: 40px !important;
          background: white !important;
          z-index: 9999 !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleSendToHospital = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from ${invoice.doctorName}`);
    const body = encodeURIComponent(
      `Dear ${invoice.hospitalName},\n\nPlease find attached invoice ${invoice.invoiceNumber} for services rendered on ${invoice.shiftDate}.\n\nTotal Amount: $${total.toLocaleString()} AUD\n\nKind regards,\n${invoice.doctorName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 shrink-0 sm:ml-auto">
            <Button variant="outline" size="default" onClick={handleSendToHospital} className="whitespace-nowrap">
              Send to Hospital
            </Button>
            <Button variant="primary" size="default" onClick={handleDownloadPdf} className="whitespace-nowrap">
              Download PDF
            </Button>
          </div>
        </div>

        <div className="bg-white border border-soft-gray rounded-[12px] p-6 sm:p-8 mx-auto w-full max-w-[1134px] min-h-[1387px]">
          <InvoiceDocument ref={printRef} invoice={invoice} />
        </div>
    </div>
  );
}
