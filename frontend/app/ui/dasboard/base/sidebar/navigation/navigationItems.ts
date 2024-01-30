import { LuLayoutDashboard, LuLogOut, LuSettings } from "react-icons/lu";

export const navigationItems = [
  {
    type: "link",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    type: "header",
    label: "Account",
  },
  {
    type: "link",
    label: "Settings",
    icon: LuSettings,
    path: "/dashboard/settings",
  },
  {
    type: "link",
    label: "Logout",
    icon: LuLogOut,
    path: "/login",
  },
];
