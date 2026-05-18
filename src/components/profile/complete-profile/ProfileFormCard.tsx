import { Typography } from '@/components/shared/typography';

interface ProfileFormCardProps {
  title: string;
  children: React.ReactNode;
}

export function ProfileFormCard({ title, children }: ProfileFormCardProps) {
  return (
    <section className="rounded-[12px] bg-white! p-6 sm:p-8 lg:p-10 px-6 sm:px-8 lg:px-15">
      <Typography as="h1" size="h1" weight="semibold" className="text-dark-gray mb-6 text-center">
        {title}
      </Typography>
      {children}
    </section>
  );
}
