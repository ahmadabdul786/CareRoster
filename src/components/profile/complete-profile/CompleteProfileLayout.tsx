'use client';

import { CompleteProfileSidebar } from './CompleteProfileSidebar';
import { RadialGradient } from '@/components/shared/radial-gradient';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface CompleteProfileLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  tag?: string;
  title?: string;
  description?: string;
  steps?: Step[];
  onSkip?: () => void;
}

const defaultSteps: Step[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Add your personal details',
    icon: 'mdi:information-outline',
  },
  {
    id: 'documents',
    title: 'Document Uploads',
    description: 'Upload your required documents',
    icon: 'mdi:file-upload-outline',
  },
];

export function CompleteProfileLayout({ 
  children, 
  currentStep,
  tag = "Doctors",
  title = "Complete Your Profile",
  description = "Please complete your profile to start applying for locum shifts.",
  steps = defaultSteps,
  onSkip,
}: CompleteProfileLayoutProps) {
  return (
    <div className="relative min-h-screen lg:h-screen overflow-hidden">
      <div className="relative mx-auto flex min-h-screen lg:h-screen w-full max-w-site flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:block lg:w-[632px] lg:flex-shrink-0">
          <CompleteProfileSidebar
            tag={tag}
            title={title}
            description={description}
            steps={steps}
            currentStep={currentStep}
            onSkip={onSkip}
          />
        </div>
        
        {/* Form Area - Full width on mobile/tablet, 60% on desktop */}
        <div className="relative w-full lg:flex-1 bg-[#ECECEC] overflow-hidden">
          <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-10">
            <RadialGradient />
            <div className="relative z-10 w-full max-w-[638px] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
