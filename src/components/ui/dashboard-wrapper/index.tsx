import { DashboardHeader } from "@/components/ui/dashboard-header";

interface DashboardWrapperProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export function DashboardWrapper({ title, subtitle, children }: DashboardWrapperProps) {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title={title} subtitle={subtitle} />
            <div className="flex-1 px-8 pb-8">
                {children}
            </div>
        </div>
    );
}
