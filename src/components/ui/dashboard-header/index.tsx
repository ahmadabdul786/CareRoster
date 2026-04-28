import { Bell } from "lucide-react";
import { Typography } from "@/components/shared/typography";

interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
    return (
        <header className="flex items-start justify-between px-8 pt-8 pb-4">
            <div className="flex flex-col gap-0.5">
                <Typography
                    as="h1"
                    size="h3"
                    weight="bold"
                    className="text-gold-deep"
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography size="md" weight="normal" className="text-muted-gray">
                        {subtitle}
                    </Typography>
                )}
            </div>

            <button
                aria-label="Notifications"
                className="w-9 h-9 rounded-full border border-divider-gray flex items-center justify-center text-muted-gray hover:text-white hover:border-light-gray transition-colors duration-150 shrink-0"
            >
                <Bell size={18} />
            </button>
        </header>
    );
}
