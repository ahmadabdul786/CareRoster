export type InvoicePaymentColumnId = 'description' | 'hours' | 'rate' | 'amount';

export interface InvoicePaymentColumn {
  id: InvoicePaymentColumnId;
  label: string;
  width: string;
}

export interface InvoiceLineItem {
  title: string;
  subtitle?: string;
  hours: number;
  rate: number;
  amount: number;
}

export interface InvoicePaymentSummaryTableProps {
  lineItems: InvoiceLineItem[];
  subtotal: number;
  gstPercent: number;
  gst: number;
  total: number;
  columns?: InvoicePaymentColumn[];
}
