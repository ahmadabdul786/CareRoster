"use client";

import { useRef, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { InvoiceDocument } from "@/components/ui/invoice-document";
import { mockInvoices } from "@/constants/mockInvoices";
import { timesheetInvoiceStatusStyles } from "@/constants/statusStyles";
import { getInvoicePdfFileName } from "@/lib/invoicePdf";

function computeTotals(amount: number, gstPercent: number) {
  const subtotal = amount;
  const gst = Math.round(subtotal * (gstPercent / 100) * 100) / 100;
  return subtotal + gst;
}

export default function InvoiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const invoice = mockInvoices.find((inv) => inv.id === Number(id));
  if (!invoice) return notFound();

  const total = computeTotals(invoice.amount, invoice.gstPercent);
  const statusStyle = timesheetInvoiceStatusStyles[invoice.status];

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      const { downloadInvoicePdf } = await import("@/lib/downloadInvoicePdf.client");
      await downloadInvoicePdf(
        element,
        getInvoicePdfFileName(invoice.invoiceNumber),
      );
    } catch (error) {
      console.error("Failed to generate invoice PDF:", error);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleSendToHospital = () => {
    const subject = encodeURIComponent(
      `Invoice ${invoice.invoiceNumber} from ${invoice.doctorName}`,
    );
    const body = encodeURIComponent(
      `Dear ${invoice.hospitalName},\n\nPlease find attached invoice ${invoice.invoiceNumber} for services rendered on ${invoice.shiftDate}.\n\nTotal Amount: $${total.toLocaleString()} AUD\n\nKind regards,\n${invoice.doctorName}`,
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <Typography
            as="h1"
            size="h1"
            weight="semibold"
            className="text-dark-gray mb-1"
          >
            Generate Invoice
          </Typography>
          <Typography
            as="p"
            size="lg"
            weight="normal"
            className="text-secondary-gray"
          >
            Preview and send your auto-generated invoice
          </Typography>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Typography
              as="span"
              size="md"
              weight="normal"
              className="text-secondary-gray"
            >
              Invoice Status:
            </Typography>
            <Typography
              as="span"
              size="md"
              weight="medium"
              className={`px-4 py-1 rounded-full text-sm ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 sm:ml-auto">
          <Button
            variant="outline"
            size="default"
            onClick={handleSendToHospital}
            className="!w-[180px] h-[56px] min-h-[56px] shrink-0 whitespace-nowrap"
          >
            Send to Hospital
          </Button>
          <Button
            variant="primary"
            size="default"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="!w-[163px] h-[56px] min-h-[56px] shrink-0 whitespace-nowrap"
          >
            {isDownloadingPdf ? "Generating…" : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="bg-white border border-soft-gray rounded-[12px] mx-auto w-full max-w-[1134px] min-h-[1387px]">
        <div ref={printRef}>
          <InvoiceDocument invoice={invoice} />
        </div>
      </div>
    </div>
  );
}
