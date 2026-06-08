"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { ClockUserIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/shared/typography";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  iconComponent?: PhosphorIcon;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface DashboardSidebarProps {
  role: "doctor" | "hospital";
}

const doctorSections: SidebarSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard-doctor", icon: "ph:house" },
    ],
  },
  {
    title: "Shifts",
    items: [
      {
        label: "Browse Shifts",
        href: "/dashboard-doctor/browse-shifts",
        icon: "ph:plus-square",
      },
      {
        label: "My Applications",
        href: "/dashboard-doctor/my-applications",
        icon: "ph:file-text",
      },
      {
        label: "My Shifts",
        href: "/dashboard-doctor/my-shifts",
        icon: "ph:clock",
        iconComponent: ClockUserIcon,
      },
    ],
  },
  {
    items: [
      {
        label: "Create Timesheet",
        href: "/dashboard-doctor/create-timesheet",
        icon: "ph:table",
      },
      {
        label: "My Timesheets",
        href: "/dashboard-doctor/my-timesheets",
        icon: "ph:grid-nine",
      },
      {
        label: "My Invoices",
        href: "/dashboard-doctor/my-invoices",
        icon: "ph:invoice",
      },
    ],
  },
];

const hospitalSections: SidebarSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard-hospital", icon: "ph:house" },
    ],
  },
  {
    title: "Shifts",
    items: [
      {
        label: "Create Shift",
        href: "/hospital/create-shift",
        icon: "ph:plus-square",
      },
      { label: "My Shifts", href: "/hospital/my-shifts", icon: "ph:clock" },
    ],
  },
];

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const sections = role === "doctor" ? doctorSections : hospitalSections;
  const profileHref =
    role === "doctor"
      ? "/dashboard-doctor/profile"
      : "/dashboard-hospital/profile";

  return (
    <aside className="flex h-screen w-[258px] max-h-screen flex-col bg-white lg:h-[calc(100vh-60px)] lg:max-h-[calc(100vh-60px)]">
      {/* Navigation Sections */}
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[6px]">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={cn(
              "my-2",
              section.title && "border-t border-b border-[#ECECEC] py-1.5",
            )}
          >
            {section.title && (
              <Typography
                size="sm"
                weight="semibold"
                className="  ml-3 text-dark-gray"
              >
                {section.title}
              </Typography>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const ItemIcon = item.iconComponent;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3  p-3 rounded-lg transition-all",
                      isActive
                        ? "bg-light-blue text-white"
                        : "text-[#212121] hover:bg-lighter-soft-gray hover:text-dark-gray",
                    )}
                  >
                    {ItemIcon ? (
                      <ItemIcon className="w-5 h-5 shrink-0" />
                    ) : (
                      <Icon icon={item.icon} className="w-5 h-5 shrink-0" />
                    )}
                    <Typography size="md" weight="normal" className="leading-6">
                      {item.label}
                    </Typography>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="shrink-0 border-t border-[#ECECEC] px-[6px] pt-1 space-y-1">
        <Link
          href={profileHref}
          className={cn(
            "flex items-center gap-2 p-3 py-3 rounded-lg transition-all text-white",
            pathname === profileHref
              ? "bg-light-blue"
              : "bg-dark-blue hover:bg-light-blue",
          )}
        >
          <Icon icon="ph:user" className="w-5 h-5 shrink-0 text-current" />
          <Typography
            size="md"
            weight="normal"
            className="leading-6 text-current"
          >
            Profile
          </Typography>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-2 p-3 py-3 rounded-lg transition-all text-secondary-gray hover:bg-light-blue hover:text-white"
        >
          <Icon icon="ph:sign-out" className="w-5 h-5 shrink-0 text-current" />
          <Typography
            size="md"
            weight="normal"
            className="leading-6 text-current"
          >
            Logout
          </Typography>
        </Link>
      </div>
    </aside>
  );
}
