"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Asterisk,
    Users,
    IdCard,
    Building2,
    Map,
    History,
    CreditCard,
    UserRoundCheck,
    Headphones,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Cluster Management", href: "/cluster-management", icon: Asterisk },
    { label: "Resident Management", href: "/resident-management", icon: Users },
    { label: "Verification Queue", href: "/verification-queue", icon: IdCard },
    { label: "Companies Management", href: "/companies-management", icon: Building2 },
    { label: "Live Patrol Map", href: "/live-patrol-map", icon: Map },
    { label: "Duty Session History", href: "/duty-session-history", icon: History },
    { label: "Subscription Overview", href: "/subscription-overview", icon: CreditCard },
    { label: "Referrals", href: "/referrals", icon: UserRoundCheck },
];

function ShieldLogo() {
    return (
        <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Shield shape with gradient */}
            <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="20%" stopColor="#BB9650" />
                    <stop offset="100%" stopColor="#E9D785" />
                </linearGradient>
            </defs>
            <path
                d="M19 2L5 7.5V18C5 25.5 11.2 32.4 19 34.5C26.8 32.4 33 25.5 33 18V7.5L19 2Z"
                fill="url(#shieldGrad)"
            />
            {/* G letter */}
            <text
                x="19"
                y="23"
                textAnchor="middle"
                fill="#1E1E1E"
                fontSize="13"
                fontWeight="800"
                fontFamily="sans-serif"
            >
                G
            </text>
        </svg>
    );
}

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="flex flex-col w-[240px] min-w-[240px] h-screen sticky top-0"
            style={{ backgroundColor: "var(--primary-dark)" }}
        >
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-5 py-5"
                style={{ borderBottom: "1px solid var(--divider-gray)" }}
            >
                <ShieldLogo />
                <div className="flex flex-col leading-tight">
                    <span
                        className="font-bold text-[17px] tracking-wide"
                        style={{ color: "var(--white)" }}
                    >
                        Goldeneye
                    </span>
                    <span
                        className="text-[11px] font-normal"
                        style={{ color: "var(--muted-gray)" }}
                    >
                        Admin Panel
                    </span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(href + "/");
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13.5px] font-medium transition-colors duration-150",
                            )}
                            style={{
                                backgroundColor: isActive ? "var(--secondary-dark)" : "transparent",
                                color: isActive ? "var(--primary-gold)" : "var(--light-gray)",
                            }}
                            onMouseEnter={e => {
                                if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary-dark)";
                                    (e.currentTarget as HTMLElement).style.color = "var(--white)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                                    (e.currentTarget as HTMLElement).style.color = "var(--light-gray)";
                                }
                            }}
                        >
                            <Icon
                                size={18}
                                className="shrink-0"
                                style={{ color: isActive ? "var(--primary-gold)" : "var(--muted-gray)" }}
                            />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div
                className="px-3 pb-5 pt-4 flex flex-col gap-1"
                style={{ borderTop: "1px solid var(--divider-gray)" }}
            >
                {/* Emergency Support — gradient button */}
                <Link
                    href="/emergency-support"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13.5px] font-semibold transition-opacity duration-150 hover:opacity-90 bg-gradient-primary"
                    style={{ color: "var(--primary-dark)" }}
                >
                    <Headphones size={18} className="shrink-0" />
                    <span>Emergency Support</span>
                </Link>

                {/* Logout */}
                <button
                    className="flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13.5px] font-medium transition-colors duration-150 w-full text-left"
                    style={{ color: "var(--light-gray)" }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary-dark)";
                        (e.currentTarget as HTMLElement).style.color = "var(--white)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--light-gray)";
                    }}
                >
                    <LogOut
                        size={18}
                        className="shrink-0"
                        style={{ color: "var(--muted-gray)" }}
                    />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
