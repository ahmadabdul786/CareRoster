import React from 'react';

// ─── Stat Card ────────────────────────────────────────────────────────────────

export interface StatCardProps {
    label: string;
    value: string;
    description: string;
    dark?: boolean;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export type SOSAlertStatus = "Acknowledged" | "Resolved" | "Timed Out";

export interface SOSAlert extends Record<string, unknown> {
    _id: string;
    date: string;
    time: string;
    cluster: string;
    clusterColor: string;
    residentName: string;
    driver: string;
    status: SOSAlertStatus;
}

export type SOSRowProps = SOSAlert & { idx: number };

// ─── Data Table ───────────────────────────────────────────────────────────────

export interface TableColumn {
    /** Unique identifier for the column, used as the sort key */
    id: string;
    /** Display label rendered in the header */
    label: string;
    /** Whether the column is sortable */
    sortable?: boolean;
}

export interface TableMeta {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
}

export interface DataTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
    /** Array of row data objects */
    tableRows?: TRow[];
    /** Column definitions */
    ColumnsData?: TableColumn[];
    /** Row renderer component — receives a row plus its index */
    TableBodyRow: React.ComponentType<TRow & { idx: number }>;
    /** Pagination metadata */
    meta?: TableMeta;
    /** Callback fired when the user changes page */
    setCurrentPage?: (page: number) => void;
    /** Whether to show the pagination bar */
    paginate?: boolean;
    /** Whether the table is in a loading state */
    loading?: boolean;
    /** Number of skeleton rows to show while loading */
    rowsPerPage?: number;
    /** Background colour class for the header row */
    headerColor?: string;
    /** Extra class names applied to each header cell */
    headerClassName?: string;
    /** Tailwind class controlling header horizontal alignment */
    headerPosition?: string;
    /** Adds rounded corners to the header */
    roundedHeader?: boolean;
    /** Text shown when no rows match */
    notFonudText?: string;
    /** Enables invoice-style column alignment (first col left, rest centred) */
    invoice?: boolean;
}

// ─── Hospital Dashboard ───────────────────────────────────────────────────────

export * from './hospital';

// ─── Doctor Dashboard ─────────────────────────────────────────────────────────

export * from './doctor';
export * from './myShifts';
export * from './myApplications';
