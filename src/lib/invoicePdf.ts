export function getInvoicePdfFileName(invoiceNumber: string): string {
  const safeName = invoiceNumber.replace(/[\\/:*?"<>|]/g, '-').trim();
  return `${safeName}.pdf`;
}
