import { CompleteProfileSidebar } from './CompleteProfileSidebar';

interface CompleteProfileLayoutProps {
  children: React.ReactNode;
}

const steps = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Add your personal details',
    icon: 'mdi:account-outline',
    status: 'active' as const,
  },
  {
    id: 'documents',
    title: 'Document Uploads',
    description: 'Upload your required documents',
    icon: 'mdi:file-document-outline',
    status: 'upcoming' as const,
  },
];

export function CompleteProfileLayout({ children }: CompleteProfileLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="auth-profile-glow pointer-events-none absolute right-[-280px] top-[120px] h-[640px] w-[640px] rounded-full" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-site flex-col gap-10 lg:flex-row lg:gap-12 bg-soft-gray/70 ">
        <div className="w-full lg:w-[46%]">
          <CompleteProfileSidebar
            tag="Doctors"
            title="Complete Your Profile"
            description="Please complete your profile to start applying for locum shifts."
            steps={steps}
          />
        </div>
        <div className="w-full lg:w-[54%] bg-lighter-soft-gray p-6 sm:p-8 lg:p-10 px-6 sm:px-8 lg:px-20">{children}</div>
      </div>
    </div>
  );
}
