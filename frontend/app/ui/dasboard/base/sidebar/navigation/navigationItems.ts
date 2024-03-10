import { FileDiff, LayoutDashboard, LogOut, LucideIcon, Settings } from "lucide-react";

export interface NavigationItem {
  type: "link" | "header";
  label: string;
  icon?: LucideIcon;
  path?: string | undefined;
}

export const navigationItems: NavigationItem[] = [
  {
    type: "link",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    type: "link",
    label: "Transactions History",
    icon: FileDiff,
    path: "/dashboard/transactions",
  },
  {
    type: "header",
    label: "Account",
  },
  {
    type: "link",
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    type: "link",
    label: "TEMPORARY Categories",
    icon: Settings,
    path: "/dashboard/settings/categories",
  },
  {
    type: "link",
    label: "Logout",
    icon: LogOut,
    path: "/login",
  },
];
