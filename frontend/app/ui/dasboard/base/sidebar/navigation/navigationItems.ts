import { FileDiff, Layers3, LayoutDashboard, LogOut, LucideIcon } from "lucide-react";

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
    label: "Categories",
    icon: Layers3,
    path: "/dashboard/settings/categories",
  },
];
