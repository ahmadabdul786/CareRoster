export function getInvoicePdfFileName(invoiceNumber: string): string {
  const safeName = invoiceNumber.replace(/[\\/:*?"<>|]/g, '-').trim();
  return `${safeName}.pdf`;
}

type SaveFilePickerOptions = {
  suggestedName?: string;
  types?: Array<{
    description?: string;
    accept: Record<string, string[]>;
  }>;
};

async function savePdfBlob(blob: Blob, fileName: string) {
  const showSaveFilePicker = (
    window as Window & {
      showSaveFilePicker?: (options: SaveFilePickerOptions) => Promise<FileSystemFileHandle>;
    }
  ).showSaveFilePicker;

  if (typeof showSaveFilePicker === 'function') {
    try {
      const handle = await showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'PDF Document',
            accept: { 'application/pdf': ['.pdf'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadInvoicePdf(element: HTMLElement, fileName: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  // Clone into a fixed 1134px off-screen wrapper so the layout is always
  // captured at the desktop/xl breakpoint, matching the on-screen template
  // regardless of the user's current viewport.
  const WRAPPER_WIDTH = 1134;

  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-invoice-pdf', '');
  Object.assign(wrapper.style, {
    position: 'absolute',
    left: '-9999px',
    top: '0px',
    width: `${WRAPPER_WIDTH}px`,
    backgroundColor: '#ffffff',
  });

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  await document.fonts.ready;

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 15000,
      scrollX: 0,
      scrollY: 0,
      // xl breakpoint (≥1280px) so column padding and font sizes match desktop
      windowWidth: 1400,
      windowHeight: 900,
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll('img').forEach((img) => {
          const src = img.getAttribute('src');
          if (src?.startsWith('/')) {
            img.src = `${window.location.origin}${src}`;
          }
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    await savePdfBlob(pdf.output('blob'), fileName);
  } finally {
    document.body.removeChild(wrapper);
  }
}
