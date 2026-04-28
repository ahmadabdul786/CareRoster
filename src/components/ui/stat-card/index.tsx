import { Typography } from "@/components/shared/typography";
import type { StatCardProps } from "@/types";

export function StatCard({ label, value, description, dark = false }: StatCardProps) {
    return (
        <div
            className="flex flex-col gap-1 rounded-2xl border p-5 min-w-0"
            style={{
                backgroundColor: dark ? "var(--primary-dark)" : "var(--white)",
                borderColor: dark ? "transparent" : "#E5E7EB",
            }}
        >
            <Typography
                size="sm"
                weight="medium"
                style={{ color: dark ? "var(--muted-gray)" : "#6B7280" }}
            >
                {label}
            </Typography>
            <Typography
                as="h2"
                size="h3"
                weight="bold"
                style={{ color: dark ? "var(--primary-gold)" : "var(--primary-dark)" }}
            >
                {value}
            </Typography>
            <Typography
                size="sm"
                weight="normal"
                style={{ color: dark ? "var(--muted-gray)" : "#9CA3AF" }}
            >
                {description}
            </Typography>
        </div>
    );
}
