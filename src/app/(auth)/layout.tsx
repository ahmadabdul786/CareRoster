import { Suspense } from 'react';
import Image from 'next/image';

import { AuthGuestGuard } from '@/components/auth/AuthGuestGuard';
import { AuthPageFallback } from '@/components/auth/AuthPageFallback';
import { ImageSlider } from '@/components/auth/ImageSlider';

const slides = [
  {
    id: 1,
    image: '/assets/images/auth/slide-1.webp',
    heading: 'Seamless Locum Staffing for Healthcare Professionals',
    description: 'Locum Hero connects doctors and hospitals across Australia, making shift booking, hiring, and management simple, fast, and reliable.'
  },
  {
    id: 2,
    image: '/assets/images/auth/slide-2.webp',
    heading: 'Find Your Perfect Shift',
    description: 'Browse available shifts, apply instantly, and manage your schedule all in one place.'
  },
  {
    id: 3,
    image: '/assets/images/auth/slide-3.webp',
    heading: 'Trusted by Healthcare Professionals',
    description: 'Join thousands of doctors and hospitals using Locum Hero for reliable staffing solutions.'
  }
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full ">
            {/* Left Section - 60% width on desktop */}
            <div className="w-full lg:w-[55%] relative min-h-screen flex flex-col">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/images/auth/left-sec.webp')" }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col lg:justify-start justify-center min-h-screen sm:px-20 px-10">
                    {/* Logo */}
                    <header className="pt-6 sm:pt-8 lg:pt-[42px] flex lg:justify-start justify-center items-center">
                        <div className="w-[150px] h-[16px] sm:w-[180px] sm:h-[20px] lg:w-[218px] lg:h-[24px]">
                            <Image 
                                src="/assets/svg/logo.svg" 
                                alt="Locum Hero" 
                                width={218}
                                height={24}
                                className="w-full h-full  object-contain"
                                priority
                            />
                        </div>
                    </header>

                    {/* Form Content */}
                    <main className="flex items-center lg:justify-start justify-center py-8 lg:py-20 lg:h-full">
                        
                    <div className="w-full md:max-w-[638px] flex flex-col justify-center items-center bg-white sm:px-20 sm:py-10 p-4 rounded-[12px] min-h-[320px]">
                      <Suspense fallback={<AuthPageFallback />}>
                        <AuthGuestGuard>{children}</AuthGuestGuard>
                      </Suspense>
                        </div>
                    </main>

                </div>
            </div>

            {/* Right Section - 40% width on desktop, hidden on mobile/tablet */}
            <div className="hidden lg:flex lg:w-[45%] lg:min-h-screen">
                <ImageSlider slides={slides} />
            </div>
        </div>
    );
}
