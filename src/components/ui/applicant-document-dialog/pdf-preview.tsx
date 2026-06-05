'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Typography } from '@/components/shared/typography';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  url: string;
  title: string;
}

export function PdfPreview({ url, title }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const pdfSrc = useMemo(() => url, [url]);

  useEffect(() => {
    let cancelled = false;

    const loadPdf = async () => {
      setIsLoading(true);
      setLoadError(false);
      setPdfData(null);
      setNumPages(0);

      try {
        const response = await fetch(pdfSrc, { cache: 'no-store' });
        if (response.status !== 200) throw new Error(`Failed to load PDF (${response.status})`);

        const buffer = await response.arrayBuffer();
        if (buffer.byteLength === 0) throw new Error('PDF file is empty');

        if (!cancelled) {
          setPdfData(buffer);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    };

    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [pdfSrc]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 min-h-[400px] text-center">
        <Typography as="p" size="md" weight="normal" className="text-secondary-gray max-w-sm">
          Unable to preview this document here. Use Open to view it in a new tab.
        </Typography>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-light-blue text-white text-sm font-medium hover:bg-light-blue/90 transition-colors"
        >
          Open Document
        </a>
      </div>
    );
  }

  if (isLoading || !pdfData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
          Loading document...
        </Typography>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full overflow-y-auto p-4 sm:p-6">
      <Document
        file={{ data: new Uint8Array(pdfData) }}
        options={{ disableRange: true, disableStream: true }}
        onLoadSuccess={({ numPages: totalPages }) => setNumPages(totalPages)}
        onLoadError={() => setLoadError(true)}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            key={`${title}-page-${index + 1}`}
            pageNumber={index + 1}
            width={containerWidth ? Math.min(containerWidth - 32, 860) : undefined}
            className="mx-auto mb-4 shadow-sm"
          />
        ))}
      </Document>
    </div>
  );
}
