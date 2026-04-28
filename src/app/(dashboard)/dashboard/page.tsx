"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardWrapper } from "@/components/ui/dashboard-wrapper";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { StatCard } from "@/components/ui/stat-card";
import DataTable from "@/components/shared/data-table";
import type { TableColumn, SOSAlert, SOSRowProps, SOSAlertStatus } from "@/types";

// ─── SOS Alert constants ──────────────────────────────────────────────────────

const statusStyles: Record<SOSAlertStatus, { bg: string; color: string }> = {
    Acknowledged: { bg: "#FEF3C7", color: "#92400E" },
    Resolved: { bg: "#DCFCE7", color: "#166534" },
    "Timed Out": { bg: "#FEE2E2", color: "#991B1B" },
};

const clusterColors: Record<string, { bg: string; color: string; border: string }> = {
    "Cluster A": { bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
    "Cluster B": { bg: "#DBEAFE", color: "#1E40AF", border: "#93C5FD" },
    "Cluster C": { bg: "#F3E8FF", color: "#6B21A8", border: "#C084FC" },
};

const sosAlertsData: SOSAlert[] = [
    { _id: "1", date: "April 16, 2024", time: "10:45 PM", cluster: "Cluster A", clusterColor: "Cluster A", residentName: "John Smith", driver: "John Miller", status: "Acknowledged" },
    { _id: "2", date: "April 16, 2024", time: "10:45 PM", cluster: "Cluster C", clusterColor: "Cluster C", residentName: "Emma Johnson", driver: "David Smith", status: "Resolved" },
    { _id: "3", date: "April 16, 2024", time: "10:45 PM", cluster: "Cluster A", clusterColor: "Cluster A", residentName: "Liam Anderson", driver: "Chris Johnson", status: "Timed Out" },
    { _id: "4", date: "April 16, 2024", time: "10:45 PM", cluster: "Cluster B", clusterColor: "Cluster B", residentName: "Olivia Martinez", driver: "Michael Brown", status: "Resolved" },
    { _id: "5", date: "April 16, 2024", time: "10:45 PM", cluster: "Cluster A", clusterColor: "Cluster A", residentName: "Noah Thompson", driver: "James Wilson", status: "Resolved" },
];

const sosColumns: TableColumn[] = [
    { id: "date", label: "Date" },
    { id: "cluster", label: "Cluster" },
    { id: "residentName", label: "Resident Name" },
    { id: "driver", label: "Driver" },
    { id: "status", label: "Status" },
];

// ─── SOS Table Row ────────────────────────────────────────────────────────────

function SOSTableRow({ date, time, cluster, clusterColor, residentName, driver, status }: SOSRowProps) {
    const clusterStyle = clusterColors[clusterColor as string] ?? { bg: "#F3F4F6", color: "#374151", border: "#D1D5DB" };
    const statusStyle = statusStyles[status as SOSAlertStatus];

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <Typography size="sm" weight="medium" style={{ color: "var(--primary-dark)" }}>
                    {date as string}
                </Typography>
                <Typography size="sm" weight="normal" style={{ color: "var(--muted-gray)" }}>
                    {time as string}
                </Typography>
            </td>
            <td className="px-6 py-4">
                <span
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                        backgroundColor: clusterStyle.bg,
                        color: clusterStyle.color,
                        borderColor: clusterStyle.border,
                    }}
                >
                    {cluster as string}
                </span>
            </td>
            <td className="px-6 py-4">
                <Typography size="sm" weight="medium" style={{ color: "var(--primary-dark)" }}>
                    {residentName as string}
                </Typography>
            </td>
            <td className="px-6 py-4">
                <Typography size="sm" weight="medium" style={{ color: "var(--primary-dark)" }}>
                    {driver as string}
                </Typography>
            </td>
            <td className="px-6 py-4">
                <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                    }}
                >
                    {status as string}
                </span>
            </td>
        </tr>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const router = useRouter();

    return (
        <DashboardWrapper
            title="Dashboard Overview"
            subtitle="Monitor key metrics and system activity"
        >
            {/* Overview Section */}
            <section className="mb-8">
                <Typography as="h2" size="xl" weight="semibold" className="mb-4" style={{ color: "var(--primary-dark)" }}>
                    Overview
                </Typography>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Row 1 */}
                    <StatCard
                        label="Total Residents"
                        value="1,248"
                        description="All registered residents"
                    />
                    <StatCard
                        label="Active Subscribers"
                        value="842"
                        description="Residents with active subscriptions"
                    />
                    <StatCard
                        label="Active Clusters"
                        value="18"
                        description="Clusters currently active"
                    />

                    {/* Pending Verifications — dark card spanning 2 rows */}
                    <div
                        className="row-span-2 flex flex-col justify-between rounded-2xl p-5"
                        style={{ backgroundColor: "var(--primary-dark)" }}
                    >
                        <div className="flex flex-col gap-1">
                            <Typography size="sm" weight="medium" style={{ color: "var(--muted-gray)" }}>
                                Pending Verifications
                            </Typography>
                            <Typography as="h2" size="h2" weight="bold" style={{ color: "var(--primary-gold)" }}>
                                27
                            </Typography>
                            <Typography size="sm" weight="normal" style={{ color: "var(--muted-gray)" }}>
                                Awaiting document review
                            </Typography>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => router.push("/verification-queue")}
                        >
                            View Requests
                        </Button>
                    </div>

                    {/* Row 2 */}
                    <StatCard
                        label="Pending Clusters"
                        value="6"
                        description="Pending clusters progressing to threshold"
                    />
                    <StatCard
                        label="Total Revenue"
                        value="$24,560"
                        description="This Month"
                    />
                    <StatCard
                        label="Active Patrols"
                        value="9"
                        description="Clusters with drivers currently on duty"
                    />
                </div>
            </section>

            {/* SOS Alerts Section */}
            <section>
                <Typography as="h2" size="xl" weight="semibold" className="mb-4" style={{ color: "var(--primary-dark)" }}>
                    SOS Alerts
                </Typography>

                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <DataTable
                        tableRows={sosAlertsData}
                        ColumnsData={sosColumns}
                        TableBodyRow={SOSTableRow as React.ComponentType<Record<string, unknown> & { idx: number }>}
                        headerColor="bg-white"
                        headerClassName="text-gray-500 text-sm font-semibold border-b border-gray-200"
                        paginate={false}
                        loading={false}
                    />
                </div>
            </section>
        </DashboardWrapper>
    );
}
