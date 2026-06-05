'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Typography } from '@/components/shared/typography';
import type { ApplicantDocument } from '@/types/hospital';

const PdfPreview = dynamic(() => import('./pdf-preview').then((mod) => mod.PdfPreview), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <Typography as="p" size="md" weight="normal" className="text-secondary-gray">
        Loading document...
      </Typography>
    </div>
  ),
});

interface ApplicantDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: ApplicantDocument | null;
  doctorName?: string;
}

function getDocumentType(url: string): 'pdf' | 'image' | 'other' {
  const extension = url.split('.').pop()?.toLowerCase() ?? '';
  if (extension === 'pdf') return 'pdf';
  if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)) return 'image';
  return 'other';
}

export function ApplicantDocumentDialog({
  isOpen,
  onClose,
  document,
  doctorName,
}: ApplicantDocumentDialogProps) {
  const documentUrl = document?.url ?? '';
  const documentType = getDocumentType(documentUrl);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !document) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="applicant-document-title"
        className="fixed inset-3 sm:inset-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(920px,calc(100vw-48px))] md:h-[min(88vh,calc(100vh-48px))] bg-white rounded-[12px] shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-soft-gray shrink-0">
          <div className="min-w-0">
            <Typography
              id="applicant-document-title"
              as="h2"
              size="h3"
              weight="semibold"
              className="text-dark-gray truncate text-base sm:text-h3"
            >
              {document.name}
            </Typography>
            {doctorName && (
              <Typography as="p" size="md" weight="normal" className="text-secondary-gray text-sm truncate">
                Submitted by {doctorName}
              </Typography>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-light-blue text-light-blue text-sm font-medium hover:bg-light-blue hover:text-white transition-colors"
            >
              <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
              Open
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 text-secondary-gray hover:text-dark-gray transition-colors"
              aria-label="Close document viewer"
            >
              <Typography as="span" size="md" weight="medium" className="text-secondary-gray hidden sm:inline">
                Close
              </Typography>
              <Icon icon="ph:x" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-light-gray/20 overflow-hidden">
          {documentType === 'pdf' ? (
            <PdfPreview url={document.url} title={document.name} />
          ) : documentType === 'image' ? (
            <div className="flex items-center justify-center p-4 sm:p-6 min-h-[60vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={document.url}
                alt={document.name}
                className="max-w-full max-h-[70vh] object-contain rounded-[8px] shadow-sm"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[40vh] text-center">
              <Icon icon="mdi:file-document-outline" className="w-16 h-16 text-light-blue" />
              <Typography as="p" size="md" weight="normal" className="text-secondary-gray max-w-sm">
                Preview is not available for this file type. Use Open to view the document in a new tab.
              </Typography>
              <a
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-light-blue text-white text-sm font-medium hover:bg-light-blue/90 transition-colors"
              >
                <Icon icon="ph:arrow-square-out" className="w-4 h-4" />
                Open Document
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
