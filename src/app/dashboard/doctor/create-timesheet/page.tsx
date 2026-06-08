'use client';

import { Suspense } from 'react';
import { CreateTimesheetContent } from '@/components/ui/create-timesheet-content';

export default function CreateTimesheetPage() {
  return (
    <Suspense fallback={<div className="p-4 sm:p-6 bg-light-gray/30 min-h-screen" />}>
      <CreateTimesheetContent />
    </Suspense>
  );
}
